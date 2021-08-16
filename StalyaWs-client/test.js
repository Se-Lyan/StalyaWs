var io = require("./index.js")

var socket = io("http://localhost:3000");

socket.on("connection", () => {
	socket.emit("hey", "wesh")
})

socket.on("message", (data) => {
	console.log(data)
})