const socket = io()
socket.on("hello",data=>{
    console.log(data);
})