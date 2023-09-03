import React from "react";
import {NavLink,useRoutes } from "react-router-dom";
import routes from "./routes"

import Search from "./pages/Search/Search";

import './App.css';
export default function App(){
    const element = useRoutes(routes);
    const scrollContainerRef = React.createRef();

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
            </div>

            <div className={"search-bar"}>
                <Search/>
            </div>
            <div className={"main"}>
                {element}
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