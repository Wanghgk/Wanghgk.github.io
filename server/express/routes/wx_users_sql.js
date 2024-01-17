const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',//数据库的IP地址
    user:'root',//登录数据库的账号
    password:'admin123',//登录数据库的密码
    database:'my_db_01'//指定要操作哪个数据库
})

router.post('/all',(req,res)=>{
    const sqlStr = 'select * from wx_users_test'
    db.query(sqlStr,(err,results)=>{
        if(err){
            console.log(err.message)
            res.send({
                status:1,
                msg: 'POST请求失败'
            })
        }

        console.log(results)
        res.send({
            status:1,
            msg: 'POST请求成功',
            data: results
        })
    })
})

//用户登录
//参数包含account，password
//返回包括id，account，password，nickname，student_id，status
router.post('/signin',(req,res)=>{
    //通过req.query获取客户端通过查询字符串，发送奥服务器的数据
    const body = req.body
    console.log(body)

    //定义待执行的SQL语句
    const sqlStr = 'select * from wx_users_test where account=? and password=?'
    // 执行SQL语句
    db.query(sqlStr,[body.account,body.password],(err,results)=>{
        if(err){
            return console.log(err.message)
        }
        
        console.log(results)
        console.log(req.params)
        if(results.length !== 0){
            //调用res的send方法，向客户端响应处理的结果
            res.send({
                status: 0,//0表示处理成功,1表示处理失败
                msg: 'POST请求成功',
                data: results[0] //需要响应给客户端的数据
            })
        }else{
            res.send({
                status: 1,
                msg: 'POST请求失败',
                data:body
            })
        }
    })

    
})

//用户注册
//参数包括account，password，student_id
//返回包括status
router.post('/signup',(req,res)=>{
    //通过req.query获取客户端通过查询字符串，发送奥服务器的数据
    const body = req.body
    console.log(body)

    //向users表中，新增一条数据，其中username的值为Spider-Man,password的值为pcc123
    const user = {account: body.account,password:body.password,student_id:body.student_id}
    //定义待执行的SQL语句
    const sqlStr = 'insert into wx_users_test set ?'
    // 执行SQL语句
    db.query(sqlStr,user,(err,results)=>{
        if(err){
            console.log("插入数据失败:",err.message)
            
            res.send({
                status: 1,
                msg: 'POST请求失败'
            })
        }else if(results.affectedRows === 1){
            console.log("插入数据成功:",body)

            res.send({
                status: 0,
                msg: 'POST请求成功'
            })
        }
    })

})

module.exports = router