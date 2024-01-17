const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");


const app = express();
const server = express();

const bodyParser = require("./component")

server.use(express.static(path.join(__dirname,"static")));
app.use(express.static(path.join(__dirname,"build")));

server.use(userRoute);
server.use(bodyParser)


server.get("/", (req, res) => {
  res.send('ok');
});

server.post('/user',(req,res)=>{
  res.send(req.body);
})

app.listen(80,()=>{
  console.log("页面已部署在 80 端口！")
})

server.listen(8000, () => {
  console.log("后端程序正在监听 8000 端口！");
});
