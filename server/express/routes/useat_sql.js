const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',//数据库的IP地址
    user:'root',//登录数据库的账号
    password:'admin123',//登录数据库的密码
    database:'my_db_01'//指定要操作哪个数据库
})

router.get('/all',(req,res)=>{
    const sqlStr = 'select * from wx_users_test'
    const query = req.query
    const pages = (query.pages - 1) + 1
    var usersResult = [];
    db.query(sqlStr,(err,results)=>{
        if(err){
            console.log(err.message)
            res.send({
                status:1,
                msg: 'GET请求失败',
                data:[]
            })
        }

        let i = 0;
        let len = results.length;
        for(i=5*(pages-1);i<5*(pages-1)+5;++i){
            if(i<len){
                usersResult.push(results[i]);
            }
        }
        console.log(req.query)
        console.log(results)
        res.send({
            status:1,
            msg: 'GET请求成功',
            length:results.length,
            data: usersResult
        })
    })
})

router.get('/account',(req,res)=>{
    //通过req.query获取客户端通过查询字符串，发送奥服务器的数据
    const query = req.query
    console.log(query)

    //定义待执行的SQL语句
    const sqlStr = 'select * from wx_users_test where account=?'
    // 执行SQL语句
    db.query(sqlStr,[query.account],(err,results)=>{
        if(err){
            return console.log(err.message)
        }
        
        console.log(results)
        // console.log(req.params)
        if(results.length !== 0){
            //调用res的send方法，向客户端响应处理的结果
            res.send({
                status: 0,//0表示处理成功,1表示处理失败
                msg: 'GET请求成功',
                length:results.length,
                data: results //需要响应给客户端的数据
            })
        }else{
            res.send({
                status: 1,
                msg: 'GET请求失败',
                data:[]
            })
        }
    })
})


module.exports = router