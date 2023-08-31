import React from "react";
import {NavLink,useRoutes } from "react-router-dom";
import routes from "./routes"

import Search from "./pages/Search/Search";

import './App.css';
export default function App(){
    const element = useRoutes(routes)
    const scale = 0.3;
    return (
        <div>

            <div className="list-edition">
                <img className="logo" src="./logo.jpg" alt="main logo"/>
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
            </div>


            <div className={"main"}>
                <div className={"search-bar"}>
                    <Search/>
                </div>

                <div className={"map"} style={{'--scale':scale}}>
                    {element}
                </div>
            </div>

        </div>
    )
}

// export default class App extends React.Component {
//     // element = useRoutes(routes)
//     render(){
//         // return (<Map_OnePointTwo/>);
//         return (
//             <div>
//                 <div className="list-edition">
//                     <NavLink className="edition-item" to="/1.2">1.2</NavLink>
//                     <NavLink className="edition-item" to="/1.3">1.3</NavLink>
//                 </div>
//                 <div>
//                     {/*{this.element}*/}
//                 </div>
//             </div>
//         );
//     }
// }