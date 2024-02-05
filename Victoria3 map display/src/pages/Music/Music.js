import React,{createRef} from 'react'
import Songs from '../../music.json'

import "./Music.css"


export default class Music extends React.Component {
    constructor() {
        super();
        this.state = {isPlay:false,isLoud:true,song:0,progressTime:0,musicLength:0,voice:50}
    }

    music = createRef()
    volume = createRef()
    playPause = createRef()

    play=(e)=>{
        const {isPlay} = this.state;
        e.currentTarget.classList.toggle("play");
        e.currentTarget.classList.toggle("pause");
        this.playPause.current.classList.toggle("icon-bofang")
        this.playPause.current.classList.toggle("icon-zanting")

        if(isPlay){
            let tmpVolume = this.music.current.volume;
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },200);
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },300);
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },400);
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },500);
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },600);
            setTimeout(()=>{
                this.music.current.volume *=0.7;
            },700);
            setTimeout(()=>{
                this.music.current.volume *=0.8;
            },800);
            setTimeout(()=>{
                this.music.current.volume *=0.8;
            },900);
            setTimeout(()=>{
                this.music.current.pause();
                this.music.current.volume = tmpVolume;
            },1000);
        }else{
            this.music.current.play();
        }
        this.setState({isPlay:!isPlay})
    }

    setLoud=(e)=>{
        // console.log(e.target.value)
        const {isLoud,voice} = this.state;
        if(isNaN(e)){
            this.music.current.volume = e.target.value/100;
            if(!isLoud && e.target.value > 0){
                this.setState({voice:e.target.value,isLoud:true});
            }else{
                this.setState({voice:e.target.value});
            }
        }else{
            if(isLoud){
                this.music.current.volume = e;
                this.volume.current.value = e;
            }else {
                this.music.current.volume = voice/100;
                this.volume.current.value = voice;
            }
            this.setState({isLoud:!isLoud});
        }
    }

    lastSong=()=>{
        const {song} = this.state;
        const total = Songs.music.length;
        // console.log(song-1,"%",total,"=",(song-1)%total);
        if(song > 0){
            this.setState({song:song-1})
        }else{
            this.setState({song:total-1})
        }
    }

    nextSong=()=>{
        const {song} = this.state;
        const total = Songs.music.length;
        this.setState({song:(song+1)%total})
    }

    progressBarUpdate=()=>{
        let currentTime = this.music.current.currentTime;
        this.setState({progressTime:currentTime});
    }

    changeProgressBar=(e)=>{
        this.music.current.currentTime = e.target.value;
    }

    progressGetDuration=()=>{
        this.setState({musicLength:this.music.current.duration});
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {isPlay} = this.state;
        if(isPlay){
            this.music.current.play();
        }
    }

    render() {
        const {isPlay,isLoud,song,progressTime,musicLength} = this.state;
        return (
            <div className={"music"}>
                <div className={"shell"}>
                    <div className={"cover"}>
                        <img src={"./music_image/" + Songs.music[song].picture}/>
                    </div>
                    <div className={"info"}>
                        <div className={"title"}>{Songs.music[song].name}</div>
                    </div>
                    <div className={"volume-box"}>
                        <i className={"voice iconfont icon-shengyin_shiti"} onClick={(e) => {
                        e.currentTarget.classList.toggle("icon-shengyin_shiti")
                        e.currentTarget.classList.toggle("icon-yinliangguan")
                        this.setLoud(0)
                        }}></i>
                        <input ref={this.volume} className={"volume-range"} type={"range"} max={100} min={0}
                               onChange={(e) => {
                                   this.setLoud(e)
                               }}/>
                    </div>
                    <div className={"music-box"}>
                        <i className={"switch-song iconfont icon-shangyishou"} onClick={this.lastSong}></i>
                        <span className={"play"} onClick={this.play}>
                            <i className={"iconfont icon-bofang"} ref={this.playPause}></i>
                        </span>
                        <span className={"current-time"}>{Math.floor(progressTime / 60) + ":" + ((progressTime % 60 < 10) ? "0" : "") + Math.floor(progressTime % 60)}</span>
                        <input className={"progress_bar"} type={"range"} max={musicLength} min={0} value={progressTime}
                               onChange={(e) => {
                                   this.changeProgressBar(e)
                               }}/>
                        <span className={"duration"}>{(musicLength / 60).toFixed() + ":" + ((musicLength % 60 < 10) ? "0" : "") + (musicLength % 60).toFixed()}</span>
                        <i className={"switch-song iconfont icon-xiayishou"} onClick={this.nextSong}></i>
                    </div>
                    <audio ref={this.music} src={"./music/" + Songs.music[song].sound}
                           onTimeUpdate={this.progressBarUpdate} onDurationChange={this.progressGetDuration}
                           onEnded={this.nextSong}></audio>
                </div>
            </div>
        );
    }
}