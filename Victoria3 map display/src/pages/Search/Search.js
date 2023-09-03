import React from "react"
import SubPub from "pubsub-js";
import Color from "../../country_color.json"
import ShowCurrentState from "../ShowCurrentState/ShowCurrentState";

import "./Search.css"

export default class Search extends React.Component {

    constructor() {
        super();
        this.state = {left:0,top:0};
    }

    clientX=0;
    clientY=0;
    isGrab = false;
    targetCountryRef = React.createRef();

    searchCountry=()=>{
        const country = this.targetCountryRef.current.value;
        if(Color[country]!==undefined){
            SubPub.publish('globalCountry', {globalCountry:country});
        }else{
            alert("Country " + country + " does not exist.");
        }
    }


    grabBegin=(e)=>{
        this.isGrab = true;
        this.clientX = e.clientX;
        this.clientY = e.clientY;
    }

    grabWindow=(e)=>{
        if(this.isGrab){
            let deltaLeft = e.clientX - this.clientX;
            let deltaTop = e.clientY - this.clientY;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            const {left,top} = this.state;
            this.setState({left:left+deltaLeft,top:top+deltaTop});
        }
    }

    grabOver=()=>{
        this.isGrab = false;
    }

    render(){
        const {left,top} = this.state;
        return (
        <div className="operate-table" onMouseDown={(e)=>{this.grabBegin(e)}} onMouseMove={(e)=>{this.grabWindow(e)}} onMouseUp={this.grabOver} onMouseLeave={this.grabOver} style={{left:left,top:top}}>
            <div className="Search">
                <input className="CountryInput" ref={this.targetCountryRef} type="text" placeholder="输入所选国家三位英文简称" onMouseEnter={this.grabOver}/>
                <button className="CountryButton" onClick={this.searchCountry} onMouseEnter={this.grabOver}>设置</button>
            </div>
            <ShowCurrentState/>
        </div>

        );
    }
}