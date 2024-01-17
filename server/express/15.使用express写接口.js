const express = require('express')
const app = express();


//配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

//必须在配置cors中间件之前去配置JSONP的接口
app.get('/api/jsonp',(req,res)=>{
    //定义 JSONP 接口具体的实现过程
    //1.得到函数的名称
    const funcName = req.query.callback
    //2.定义发送到客户端的数据对象
    const data = {name:'Wanghgk',age:19}
    //3.拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    //4.把拼接的字符串，响应给客户端
    res.send(scriptStr)
})

//一定要在路由之前来配置cors这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

//导入路由模块
const router = require('./routes/16.apiRouter')


//把路由模块注册到app上
app.use('/api',router)


app.listen(80,()=>{
    console.log("运行在80端口")
})