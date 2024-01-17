//导入mysql模块
const mysql = require('mysql')
//建立与mysql数据库的连接关系
const db = mysql.createPool({
    host:'127.0.0.1',//数据库的IP地址
    user:'root',//登录数据库的账号
    password:'admin123',//登录数据库的密码
    database:'m_db_01'//指定要操作哪个数据库
})

//测试mysql模块能否正常工作
// db.query('select 1',(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }
//     console.log(results)
// })

//查询users表中所有的数据
//如果执行的是select查询语句，则执行的结果是数组
// const sqlStr = 'select * from users'
// db.query(sqlStr,(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }

//     console.log(results)
// })

    // const sqlStr = 'select * from users where username=?'
    // const users = {username:"zs"}
    // db.query(sqlStr,[users.username],(err,results)=>{
    //     if(err){
    //         console.log(err.message)
    //     }

    //     console.log(results)
    // })

//向users表中，新增一条数据，其中username的值为Spider-Man,password的值为pcc123
// const user = {username: 'Spider-Man4',password:'pcc123'}
//定义待执行的SQL语句
// const sqlStr = 'insert into users (username, password) values (?,?)'
//执行SQL语句
// db.query(sqlStr,[user.username,user.password],(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }
    // 如果执行的是 insert into 插入语句，则results是一个对象
    // 可以通过 affectedRows属性，来判断是否插入数据成功
    // console.log(results)
//     if(results.affectedRows === 1){
//         console.log("插入数据成功!")
//     }
// })

//演示插入信息的便捷方式
const user = {username: 'Spider-Man6',password:'pcc4321'}
//定义待执行的SQL语句
const sqlStr = 'insert into users set ?'
//执行SQL语句
db.query(sqlStr,user,(err,results)=>{
    if(err){
        return console.log("插入数据失败",err.message)
    }

    if(results.affectedRows === 1){
        console.log("插入数据成功!",results)
    }
})

// //演示如何更新用户的信息
// const users = {id: 16,username:'aaa',password:'000'}

// //定义SQL语句
// const sqlStr = 'update users set username=?,password=? where id=?'
// //执行SQL语句
// db.query(sqlStr,[users.username,users.password,users.id],(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }
//     //注意：执行了update语句之后，results也是一个对象，可以根据affectedRows判断是否执行成功
//     if(results.affectedRows === 1){
//         console.log("更新成功!")
//     }
// })

// //演示更新数据的便捷方式
// const users = {id: 16,username:'aaaa',password:'0000'}
// //定义一个SQL语句
// const sqlStr = 'update users set ? where id=?'
// //执行SQL语句
// db.query(sqlStr,[users,users.id],(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }

//     if(results.affectedRows === 1){
//         console.log("更新数据成功!")
//     }
// })

// //删除id为15的用户
// const sqlStr = 'delete from users where id=?'
// db.query(sqlStr,15,(err,results)=>{
//     if(err){
//         console.log(err.message)
//     }
//     //注意：执行delete语句之后，results也是一个对象，可以根据affectedRows判断是否执行成功
//     if(results.affectedRows === 1){
//         console.log("删除数据成功!")
//     }
// })

//标记删除
// const sqlStr = 'update users set status=? where id=?'
// db.query(sqlStr,[1,16],(err,results)=>{
//     if(err){
//         return console.log(err.message)
//     }

//     if(results.affectedRows === 1){
//         console.log("标记删除成功!")
//     }
// })