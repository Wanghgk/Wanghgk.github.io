const express = require("express");
const path = require("path");
// const router = require('./routes/user')
const app = express();

//配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

//解决跨域问题
const cors = require('cors')
app.use(cors())

//导入路由模块
const users = require('./routes/useat_sql')

//把路由模块注册到app上
app.use('/sql',users)

app.listen(8001,()=>{
  console.log("邮小食用户数据库已部署在 8001 端口！")
})
