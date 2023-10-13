import React,{createRef} from 'react'
import Songs from '../../music.json'

import "./Music.css"

export default class Music extends React.Component {
    constructor() {
        super();
        this.state = {isPlay:false,song:0,progressTime:0,musicLength:0}
    }

    music = createRef()

    play=()=>{
        const {isPlay} = this.state;
        if(isPlay){
            let tmpVolume = this.music.current.volume;
            setTimeout(()=>{
                this.music.current.volume *=0.8;
            },200);
            setTimeout(()=>{
                this.music.current.volume *=0.7;
            },400);
            setTimeout(()=>{
                this.music.current.volume *=0.6;
            },600);
            setTimeout(()=>{
                this.music.current.volume *=0.5;
            },800);
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
        this.music.current.volume = e.target.value/100;
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
        const {isPlay,song,progressTime,musicLength} = this.state;
        return (
            <div className={"music"}>
                <audio ref={this.music} src={"./music/"+Songs.music[song]} onTimeUpdate={this.progressBarUpdate} onDurationChange={this.progressGetDuration}></audio>
                <div className={"music-operation"}>
                    <img className={"play"} src={isPlay?"./music_image/暂停.png":"./music_image/播放.png"} onClick={this.play}/>
                    <img className={"last"} src={"./music_image/上一首.png"} onClick={this.lastSong}/>
                    <div className={"time"}>
                        <span>{(progressTime/60).toFixed() + ":" + ((progressTime%60 < 10) ? "0" : "") + (progressTime%60).toFixed() + "/" + (musicLength/60).toFixed() + ":" + ((musicLength%60 < 10) ? "0" : "") + (musicLength%60).toFixed()}</span>
                    </div>
                    <input className={"progress_bar"} type={"range"} max={musicLength} min={0} value={progressTime} onChange={(e)=>{this.changeProgressBar(e)}}/>
                    <img className={"next"} src={"./music_image/下一首.png"} onClick={this.nextSong}/>
                    <input className={"volume"} type={"range"} max={100} min={0} onChange={(e)=>{this.setLoud(e)}}/>
                </div>
            </div>
        );
    }
}