import React from 'react';
import SubPub from 'pubsub-js';
import Color from "../../country_color.json"
import './State.css';
export default class State extends React.Component {
    constructor() {
        super();
        this.state = {imageIndex:0,colorIndex:0,currentColor:'white',country:"GBR",currentIndex:0};
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.isInState = this.isInState.bind(this);
    }



    globalCountry = "GBR";
    globalColorIndex = 0;

    isInState(X,Y){
        const {width, statePng,} = this.props;
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
        const {stateName,id} = this.props;
        const {imageIndex,country,originalCountry,currentIndex} = this.state;
        const isClicked = this.state.isClicked;
        const globalCountry = this.globalCountry;
        const {offsetX, offsetY} = e.nativeEvent;
        if (this.isInState(offsetX,offsetY)) {
            this.setState({isClicked: !isClicked, country: globalCountry,currentIndex:this.globalColorIndex});
            SubPub.publish("mouseInState",{stateName:stateName,country:globalCountry,originalCountry:originalCountry});
            SubPub.publish('changeColor',{id:id,country:globalCountry,currentIndex:this.globalColorIndex})
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
            this.globalColorIndex = data.globalColorIndex;
        })
        SubPub.publish('globalCountry',{globalCountry:'GBR'});
        const {country} = this.props;
        const color = Color[country][this.globalColorIndex]["color"];
        // console.log(color);
        this.setState({currentColor:color,country:country,originalCountry:country,currentIndex:0});
    }

    render(){
        const {fileName,borderfileName,stateName,left,right,up,bottom,width} = this.props;
        const {isClicked,imageIndex,country,currentIndex} = this.state;
        let currentColor = null;
        if(currentIndex !== undefined){
            // console.log(currentIndex);
            currentColor = Color[country][currentIndex]["color"];
        }else{
            currentColor = Color[country][0]["color"];
        }

        // console.log(currentColor);
        const PngWidth = right - left + 1;
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