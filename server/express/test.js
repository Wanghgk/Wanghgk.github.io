const express = require('express')
const app = express()
const path = require("path")

app.get("/api",(req,res)=>{

    res.sendFile("/wx_static/swiper.json",{root:__dirname})
})

app.listen(5001,()=>{
    console.log("页面已部署在 5001 端口！")
})