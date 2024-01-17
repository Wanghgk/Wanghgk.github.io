const express = require("express");
const path = require("path");
// const router = require('./routes/user')
const app = express();
const image = express();

//配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

//解决跨域问题
const cors = require('cors')
app.use(cors())

image.use(express.static(path.join(__dirname,"wx_static")));

app.get("/static/swiper",(req,res)=>{
  console.log("swiper已发送")
  res.sendFile("/wx_static/swiper.json",{root:__dirname})
  
})

app.get("/static/list",(req,res)=>{
  console.log("list已发送")
  res.sendFile("/wx_static/canteenList.json",{root:__dirname})
})
app.get("/static/recommend",(req,res)=>{
  console.log("recommend已发送")
  res.sendFile("/wx_static/recommend.json",{root:__dirname})
})

//导入路由模块
const users = require('./routes/wx_users_sql')

//把路由模块注册到app上
app.use('/users',users)

app.listen(5001,()=>{
  console.log("小程序后台已部署在 5001 端口！")
})

image.listen(5002,()=>{
  console.log("图片文件已部署在5002端口")
})
