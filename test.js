const io = require("./index.js")({server: true})

io.on("connection", client => {
	io.createRoom("myRoom");
	io.joinRoom("myRoom", client.clientId);
	io.emitRoomClient("myRoom", "message", client.clientId, "Coucou :D")
})

io.listen(3000, () => { console.log("server ready"); })