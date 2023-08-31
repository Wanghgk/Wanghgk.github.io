import React from "react"
import SubPub from "pubsub-js";
import Color from "../../country_color.json"
import ShowCurrentState from "../ShowCurrentState/ShowCurrentState";

import "./Search.css"

export default class Search extends React.Component {

    targetCountryRef = React.createRef();

    searchCountry=()=>{
        const country = this.targetCountryRef.current.value;
        if(Color[country]!==undefined){
            SubPub.publish('globalCountry', {globalCountry:country});
        }else{
            alert("Country " + country + " does not exist.");
        }
    }

    render(){
        return (
        <div className="operate-table">
            <div className="Search">
                <input className="CountryInput" ref={this.targetCountryRef} type="text" placeholder="输入所选国家三位英文简称"/>
                <button className="CountryButton" onClick={this.searchCountry}>设置</button>
            </div>
            <ShowCurrentState/>
        </div>

        );
    }
}