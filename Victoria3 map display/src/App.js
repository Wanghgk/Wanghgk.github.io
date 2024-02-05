import React,{useRef} from "react";
import {NavLink,useRoutes } from "react-router-dom";
import routes from "./routes"
import Music from "../src/pages/Music/Music"

import './App.css';
export default function App(){
    const element = useRoutes(routes);
    const belowBar = useRef();

    const toggleClick = ()=>{
        // eslint-disable-next-line no-unused-expressions
        belowBar.current.classList.toggle("close")
    }



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
                            <li><NavLink className="edition-item" to="/1.5">1.5</NavLink></li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div className={"main"}>
                {element}
            </div>
            <div className={"below-bar close"} ref={belowBar}>
                <div className={"arrow-container"}>
                    <i className={"iconfont icon-xiangyoujiantou toggle"} onClick={toggleClick}></i>
                </div>
                <Music/>
            </div>
        </div>
    )
}
