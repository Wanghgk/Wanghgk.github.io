import React from "react";
import {NavLink,useRoutes } from "react-router-dom";
import routes from "./routes"
import Music from "../src/pages/Music/Music"

import './App.css';
export default function App(){
    const element = useRoutes(routes);




    return (
        <div>

            <div className="list-edition">
                <div className={"logo-div"}>
                    <img className="logo" src="./logo.jpg" alt="main logo"/>
                </div>
                <ul className="menu">
                    <li>
                        <NavLink className="edition-item" to="/">首页</NavLink>
                    </li>
                    <li>
                        <span className="edition-item">版本</span>
                        <ol className="drop-down">
                            <li><NavLink className="edition-item" to="/1.3">1.3</NavLink></li>
                        </ol>
                    </li>
                </ul>
                <Music/>
            </div>
            <div className={"main"}>
                {element}
            </div>
        </div>
    )
}
