import React,{createRef} from "react"
import SubPub from "pubsub-js";
import Color from "../../country_color.json"
import States from "../../stateData_1.3.json"
import Country from "../../state_country.json"
import CountryName from "../../countryArray.json"
import CountryChineseName from "../../countries_l_simp_chinese.json"
import ShowCurrentState from "../ShowCurrentState/ShowCurrentState";

import "./Search.css"

export default class Search extends React.Component {

    constructor() {
        super();
        this.state = {left:0,top:0,country:"GBR",countryLower:[],show:"none"};
    }

    states=[];

    clientX = 0;

    clientY = 0;
    isGrab = false;
    targetCountryRef = createRef();
    canvasRef = createRef();

    initCountryShot=(country)=>{
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        // let image = new Image();
        // image.src = "./1.3_states_doubleTransparent/STATE_ALASKA.png"
        // ctx.drawImage(image,0,0);

        this.states.map((e)=>{
            if(e.country === country) {
                let fileName = "./1.3_states_doubleTransparent/" + e.name + ".png";
                let img = new Image();
                img.src = fileName;
                img.onload = () => {
                    ctx.drawImage(img, e.left, e.bottom);
                    let colorString = Color[e.country][e.countryIndex]["color"];
                    // console.log();

                    let r = parseInt(colorString.substring(1, 3), 16);
                    let g = parseInt(colorString.substring(3, 5), 16);
                    let b = parseInt(colorString.substring(5), 16);
                    let targetColor = [255, 255, 255];
                    let newColor = [r, g, b];
                    // console.log(r,g,b);

                    let width = e.right - e.left;
                    let height = e.top - e.bottom;
                    let x = e.left;
                    let y = e.bottom;
                    // console.log(x,Number.isInteger(x),y,Number.isInteger(y),width,Number.isInteger(width),height,Number.isInteger(height));
                    let outThisImgData = ctx.getImageData(x, y, width, height);
                    let thisImgData = outThisImgData.data;
                    // console.log(thisImgData.length);
                    for (let i = 0; i < thisImgData.length; i += 4) { // 4个值表示一个像素的RGBA颜色
                        const pixelColor = [thisImgData[i], thisImgData[i + 1], thisImgData[i + 2]];

                        // 检查是否与目标颜色匹配
                        if (pixelColor[0] === targetColor[0] &&
                            pixelColor[1] === targetColor[1] &&
                            pixelColor[2] === targetColor[2]) {

                            // 更改像素颜色为新的颜色
                            thisImgData[i] = newColor[0];
                            thisImgData[i + 1] = newColor[1];
                            thisImgData[i + 2] = newColor[2];
                            // console.log(thisImgData[i],thisImgData[i+1],thisImgData[i+2],thisImgData[i+3]);
                        }
                    }
                    ctx.putImageData(outThisImgData, x, y);
                }
            }
        })

    }
    initWholeShot=()=>{
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        // let image = new Image();
        // image.src = "./1.3_states_doubleTransparent/STATE_ALASKA.png"
        // ctx.drawImage(image,0,0);

        this.states.map((e)=>{
            let fileName = "./1.3_states_doubleTransparent/"+e.name+".png";
            let img = new Image();
            img.src = fileName;
            img.onload = ()=>{
                ctx.drawImage(img,e.left,e.bottom);
                let colorString = Color[e.country][e.countryIndex]["color"];
                // console.log();

                let r = parseInt(colorString.substring(1, 3), 16);
                let g = parseInt(colorString.substring(3, 5), 16);
                let b = parseInt(colorString.substring(5), 16);
                let targetColor = [255,255,255];
                let newColor = [r,g,b];
                // console.log(r,g,b);

                let width = e.right-e.left;
                let height = e.top-e.bottom;
                let x = e.left;
                let y = e.bottom;
                // console.log(x,Number.isInteger(x),y,Number.isInteger(y),width,Number.isInteger(width),height,Number.isInteger(height));
                let outThisImgData = ctx.getImageData(x,y,width,height);
                let thisImgData = outThisImgData.data;
                // console.log(thisImgData.length);
                for (let i = 0; i < thisImgData.length; i += 4) { // 4个值表示一个像素的RGBA颜色
                    const pixelColor = [thisImgData[i], thisImgData[i + 1], thisImgData[i + 2]];

                    // 检查是否与目标颜色匹配
                    if (pixelColor[0] === targetColor[0] &&
                        pixelColor[1] === targetColor[1] &&
                        pixelColor[2] === targetColor[2]) {

                        // 更改像素颜色为新的颜色
                        thisImgData[i] = newColor[0];
                        thisImgData[i + 1] = newColor[1];
                        thisImgData[i + 2] = newColor[2];
                        // console.log(thisImgData[i],thisImgData[i+1],thisImgData[i+2],thisImgData[i+3]);
                    }
                }
                ctx.putImageData(outThisImgData,x,y);
            }
        })
    }
    mapShot=()=>{
        const canvas = this.canvasRef.current;

        const dataUrl = canvas.toDataURL('image/png');
        // console.log(dataUrl);
// 假设 imageData 包含了要下载的图像数据，可以是一个包含 Base64 字符串的变量
        const imageData = dataUrl; // 替换为您的 Base64 数据

// 创建一个下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData; // 设置 Base64 字符串作为链接的 href 属性
        downloadLink.download = 'downloaded_image.png'; // 设置下载的文件名

// 模拟点击下载链接来触发下载
        downloadLink.click();
    }

    clearCanvas=()=>{
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        // let image = new Image();
        // image.src = "./1.3_states_doubleTransparent/STATE_ALASKA.png"
        // ctx.drawImage(image,0,0);
        let w = canvas.width;
        let h = canvas.height;
        ctx.clearRect(0, 0, w, h);
    }
    searchCountry=()=>{
        const country = this.targetCountryRef.current.value;
        if(Color[country]!==undefined){
            this.setState({country:country});
        }else{
            alert("Country " + country + " does not exist.");
        }
    }

    /*该函数是上个函数的平替，用于下拉框直接点击设置国家*/
    setCountry=(e)=>{
        this.setState({country:e,show:"none"});
        this.targetCountryRef.current.value = e;
    }

    possibleCountry=()=>{
        const country = this.targetCountryRef.current.value;
        let possible = [];
        let show = this.state.show;
        if(country.length >= 4 || country===""){
            show = "none";
        }else{
            show = "none";
            CountryName.countries.map((e)=>{
                if(e.name.indexOf(country) === 0){
                    possible.push(e.name);
                    show = "visible"
                }
            })
        }
        this.setState({countryLower:possible,show:show});
        possible = [];
    }

    setColor=(e,index)=>{
        const {country} = this.state;
        SubPub.publish('globalCountry', {globalCountry:country,globalColorIndex:index});
        this.setState({country:country});
    }


    grabBegin=(e)=>{
        this.isGrab = true;
        this.clientX = e.clientX;
        this.clientY = e.clientY;
    }

    grabWindow=(e)=>{
        if(this.isGrab){
            let deltaLeft = e.clientX - this.clientX;
            let deltaTop = e.clientY - this.clientY;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.setState({left:this.state.left+deltaLeft,top:this.state.top+deltaTop});
        }
    }

    touchGrabWindow=(e)=>{
        if(this.isGrab){
            let deltaLeft = e.targetTouches[0].clientX - this.clientX;
            let deltaTop = e.targetTouches[0].clientY - this.clientY;
            this.clientX = e.targetTouches[0].clientX;
            this.clientY = e.targetTouches[0].clientY;
            const {left,top} = this.state;
            // console.log(this.state,deltaLeft,deltaTop);
            if(!isNaN(deltaLeft) && !isNaN(deltaTop)){
                this.setState({left:left+deltaLeft,top:top+deltaTop});
            }
            // console.log("moving");
        }
    }

    grabOver=()=>{
        this.isGrab = false;
    }

    componentDidMount() {
        this.clientX=0;
        this.clientY=0;
        States.states.map((e)=>{
            this.states.push({name:e.stateName,country:Country[e.stateName],countryIndex:0,left:e.left,top:e.up,right:e.right,bottom:e.bottom});
        })
        SubPub.subscribe('changeColor',(_,data)=>{
            const {id,country,currentIndex} = data;
            this.states[id-1].country = country;
            this.states[id-1].countryIndex = currentIndex;
        })
    }

    render(){
        const {left,top,country,countryLower,show} = this.state;
        const {addScale,subScale} = this.props;
        return (
        <div className="operate-table"
             onMouseDown={(e)=>{this.grabBegin(e)}}
             onMouseMove={(e)=>{this.grabWindow(e)}}
             onMouseUp={this.grabOver} onMouseLeave={this.grabOver}
             onTouchStart={(e)=>{this.grabBegin(e)}}
             onTouchMove={(e)=>{this.touchGrabWindow(e)}}
             onTouchEnd={this.grabOver}
             style={{left:left,top:top}}>
            <div className="Search">
                <div>
                    <input className="CountryInput" ref={this.targetCountryRef} type="text" placeholder="输入所选国家三位英文简称" onChange={this.possibleCountry} onMouseEnter={this.grabOver}/>
                    <ul className={"name-list"} style={{'--show':show}}>
                        {countryLower.map((e)=>{
                            return <div className={"country-name"} key={e}><li onClick={()=>{this.setCountry(e)}}>{e}{CountryChineseName[e]}</li></div>
                        })}
                    </ul>
                </div>
                <div className="color-list">
                    <ul>
                        {
                            Color[country].map((e,index)=>{
                                return <li key={e.color}><button onClick={(e)=>{this.setColor(e,index)}}>{e.tip}</button></li>
                            })
                        }
                    </ul>
                </div>
                <button className="CountryButton" onClick={this.searchCountry} onMouseEnter={this.grabOver}>查询</button>
            </div>
            <div className={"scale-operate"}>
                <button onClick={addScale}>放大</button>
                <button onClick={subScale}>缩小</button>
            </div>
            <div className={"shot-operate"}>
                <div className={"map-shot"}>
                    <button className="map-button" onClick={this.initWholeShot} onMouseEnter={this.grabOver}>加载全地图图片</button>
                    <button className="map-button" onClick={()=>{this.initCountryShot(country)}} onMouseEnter={this.grabOver}>加载当前国家图片</button>
                    <button className="map-button" onClick={this.clearCanvas} onMouseEnter={this.grabOver}>清空当前图片</button>
                </div>
                <button className="get-shot" onClick={this.mapShot} onMouseEnter={this.grabOver}>生成图片</button>
            </div>

            <ShowCurrentState/>
            <div className={"shot-container"} style={{border:"solid #e3e3e3 2px"}}>
                <canvas className={"show-shot"} ref={this.canvasRef} width={"8192"} height={"3616"} style={{display:""}}/>
            </div>

        </div>

        );
    };
}