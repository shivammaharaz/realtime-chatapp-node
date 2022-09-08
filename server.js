const express= require("express");
const app =express();


const  PORT = process.env.PORT || 3000;

const http = require("http").Server(app);

http.listen(PORT,()=>{
    // console.log("listening on port :3000")
});


app.use(express.static(__dirname+`/public`))
app.get("/", (req,resp)=>{
    resp.sendFile(__dirname,"public"+"/index.html")
})

// socket

// const io=require("socket.io")(http);

// io.on('connection ',(socket)=>{
//     socket.emit("message","hello")
// })

const io= require('socket.io')(http);
io.on('connection',(socket)=>{
    
   socket.on("message",(msg)=>{
    socket.broadcast.emit("msg",msg)
   })
    
})