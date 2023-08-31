import React from 'react'
import StateData from "../../stateData_1.3.json"
import Country from "../../state_country.json"
import Color from "../../country_color.json"
import State from "../State/State";

import "./Map.css"

export default class Map extends React.Component {
    render(){
        const {states} = StateData;
        const edition = "1.3";
        const scale=1;
        // console.log(states.length)
        return (
            <div className="Map">
                {/*<div style={{"height":100}}/>*/}
                <div className="World" style={{width:8192,height:3616}}>
                    {
                        states.map((e)=>{
                            let country = Country[e.stateName];
                            // console.log(country);
                            let color = Color[country];
                            // console.log(color);
                            return <State scale={scale} fileName={"./"+edition+"_states_doubleTransparent/"+e.stateName+".png"} borderfileName={"./"+edition+"_statesBorder_transparent/"+e.stateName+".png"} key={e.id} stateName={e.stateName} left={e.left} right={e.right} up={e.up} bottom={e.bottom} statePng={e.statePng} width={e.right-e.left+1} height={e.up-e.bottom+1} color={color} country={country}/>
                        })
                    }
                </div>
            </div>
        );
    }
}
