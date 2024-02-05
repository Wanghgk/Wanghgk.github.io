import React from 'react'
import {NavLink,useRoutes } from "react-router-dom";
import routes from "../../routes";
import "./Edition.css"

export default function Edition() {

    return (<div className={"edition-page"}>
                <div className={"edition-card-list"}>
                    <NavLink className={"edition-card"} id={"edi3"} to={"/v3map/1.3"}>1.3</NavLink>
                    <NavLink className={"edition-card"} id={"edi4"} to={"/v3map/1.4"}>1.4</NavLink>
                    <NavLink className={"edition-card"} id={"edi5"} to={"/v3map/1.3"}>1.5</NavLink>
                </div>
        </div>)
}