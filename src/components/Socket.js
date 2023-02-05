import socketClient from 'socket.io-client';

//Esto se cambia: http://localhost:8080
//Esto se cambia al link de heroku
//https://app-mensajeria1.herokuapp.com
var socket = socketClient("https://server-chat-masivo.vercel.app/");

socket.on("connection", ()=>{console.log("Conexion establecidaa");});

export default socket;