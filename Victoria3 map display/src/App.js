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
                        <NavLink className="edition-item" to="/edition">版本</NavLink>
                        <ol className="drop-down">
                            <li><NavLink className="edition-item" to="/1.3">1.3</NavLink></li>
                            <li><NavLink className="edition-item" to="/1.4">1.4</NavLink></li>
                            <li><NavLink className="edition-item" to="/1.3">1.5</NavLink></li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div className={"main"}>
                {element}
            </div>
            <div className={"below-bar"}>
                <Music/>
            </div>
        </div>
    )
}
