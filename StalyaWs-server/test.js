var socket = require("./index.js")

socket.on("connection", client => {
	console.log("Nouvelle connexion client", socket);
    socket.createRoom("myRoom", false);
    socket.createRoom("myRoom", false);
 })
 
 socket.on("disconnection", (clientId) => {
 	console.log("Client with id " + clientId + " has disconnected");
  })
 
 /**
 socket.on("disconnection", (clientId) => {
 	console.log("Client with id " + clientId + " has disconnected")
 })
 
 
socket.listen(3000, function(){ console.log("Server ready") })*/

socket.listen(3000)