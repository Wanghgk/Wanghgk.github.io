import React from "react"
import SubPub from "pubsub-js";

import "./ShowCurrentState.css"

export default class ShowCurrentState extends React.Component {
    constructor() {
        super();
        this.state={globalCountry:"GBR",currentState:"未选中",currentCountry:"未选中",originalCountry:"未选中"};
    }

    componentDidMount() {
        SubPub.subscribe("globalCountry",(_,data)=>{
            const {globalCountry} = data;
            this.setState({globalCountry:globalCountry});
        })

        SubPub.subscribe("mouseInState",(_,data)=>{
            const {stateName,country,originalCountry} = data;
            this.setState({currentState:stateName,currentCountry:country,originalCountry:originalCountry})
        })
    }

    render() {
        const {globalCountry,currentState,currentCountry,originalCountry} = this.state;
        return (
            <div className="CurrentState">
                <span>
                    <p>当前扮演国家：{globalCountry}</p>
                </span>
                <span>
                    <p>当前地区：</p>
                    <p>{currentState}</p>
                </span>
                <span>
                    <p>该地区现属国家：{currentCountry}</p>
                </span>
                <span>
                    <p>该地区开局属国家：{originalCountry}</p>
                </span>
            </div>
        );
    }
}