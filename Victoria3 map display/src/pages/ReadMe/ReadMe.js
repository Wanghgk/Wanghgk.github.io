import React from "react";
import Markdown from "react-markdown";

export default class ReadMe extends React.Component {

    render() {
        const markdown = "这是一个首页"
        return (
            <div>
                <div style={{width:"100vw",height:"100vh"}}>
                    <Markdown   ></Markdown>
                </div>
            </div>
        );
    }
}