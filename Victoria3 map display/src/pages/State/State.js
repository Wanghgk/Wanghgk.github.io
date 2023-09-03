import React from 'react';
import SubPub from 'pubsub-js';
import Color from "../../country_color.json"
import './State.css';
export default class State extends React.Component {
    constructor() {
        super();
        this.state = {imageIndex:0};
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.isInState = this.isInState.bind(this);
    }

    globalCountry = "GBR"

    isInState(X,Y){
        const {left, width, bottom, statePng, scale,stateName} = this.props;
        const clickedPx = Y * width + X;
        let isIn = false;

        statePng.map((e)=>{
            if(clickedPx >= e.begin && clickedPx <= e.end){
                isIn = true;
            }
        })

        // console.log(isIn,X,Y,left,bottom,stateName);
        return isIn;
    }
    handleClick(e) {
        const {stateName} = this.props;
        const {imageIndex,country,originalCountry} = this.state;
        const isClicked = this.state.isClicked;
        const globalCountry = this.globalCountry;
        const {offsetX, offsetY} = e.nativeEvent;
        if (this.isInState(offsetX,offsetY)) {
            this.setState({isClicked: !isClicked, country: globalCountry});
            SubPub.publish("mouseInState",{stateName:stateName,country:country,originalCountry:originalCountry});
        }else{
            this.setState({imageIndex:(imageIndex-1)});
        }
    }
    handleMouseMove(e){
        const {stateName} = this.props;
        const {offsetX, offsetY} = e.nativeEvent;
        const {imageIndex,country,originalCountry} = this.state;

        if (this.isInState(offsetX,offsetY)) {
            this.setState({imageIndex: 1});
            SubPub.publish("mouseInState",{stateName:stateName,country:country,originalCountry:originalCountry});
        }else if(!(this.isInState(offsetX,offsetY)))
            this.setState({imageIndex:(imageIndex-1)});
    }

    componentDidMount() {
        SubPub.subscribe('globalCountry',(_,data)=>{
            this.globalCountry = data.globalCountry;
        })
        SubPub.publish('globalCountry',{globalCountry:'GBR'});
        const {country} = this.props;
        const color = Color[country];
        this.setState({currentColor:color,country:country,originalCountry:country});
    }

    render(){
        const {fileName,borderfileName,stateName,left,right,up,bottom,width} = this.props;
        const {isClicked,imageIndex,country} = this.state;
        const currentColor = Color[country];
        const PngWidth = right - left + 1;
        const globalColor = this.globalColor;
        // console.log(fileName,isClicked)
        if(fileName !== undefined) {
            return (<div>
                        <div className="StateBox" draggable={"false"} style={{textIndent: -1 * PngWidth,left:left,top:bottom}}>
                            <img className="Pic" src={fileName} alt={stateName} draggable={"false"} onMouseMove={(e)=>{this.handleMouseMove(e)}} onClick={(e)=>{this.handleClick(e)}} style={{'--widthacc':width,'--stateColor':currentColor,'--imageIndex':imageIndex}}/>
                        </div>
                        <div className="BorderBox" draggable={"false"} style={{left:left,top:bottom}}>
                            <img className="Border" src={borderfileName} alt={stateName + "`s border"} draggable={"false"} style={{'--visible':isClicked?"hidden":"visible"}}/>
                        </div>
                    </div>)
        }
    }
}