# StalyaWs

Welcome to Stalya WebSocket for nodejs

Don't forget before: You can't use the library **client** without the library **server** and currently only for **small** project.

Statut: in progress (24/100%)

## Get Started

### Server side example

```javascript
const socket = require("StalyaWs")({server: true}) // <--- always true if its the server !

//When client connecting to server, you can add a callback
socket.on("connection", client => {
  console.log("New client connection !");
  
  client.on("myEventName", (data) => {
     //Emiting client
       client.emit("myEventName", "Hello Client !");
  })
})
```

### Client side example

```javascript
const io = require("StalyaWs")({server: false}) // <--- always false if its the client ! 

const socket = io("http://localhost:3000"); // Your server hostname and port

//When the connection to the server is established, you can add a callback
socket.on("connect", () => {
 console.log("Connection to server established !");
})

//Emiting server
socket.emit("myEventName", "Hello Server !");
```

## Rooms 

You want to create a special thing for a chat ? 
For example, you want to emit a chat for a new arrival of a person ?
Rooms are here, and it's his job. 
it will allow you to emit some client

Let's take a look :

```javascript
  const socket = require("StalyaWs")({server: true})
  
  //Create a room
  socket.createRoom("MyRoom");
  
  socket.on("connection", client => {
  //Add a client in a room
    socket.joinRoom("MyRoom", client.clientId)
 
 //Emit the room clients
   socket.emitAll("MyRoom", true, "MyEventName") //<--- don't forget to set true ! Otherwise you emit the event "MyRoom" for all clients !
  })
  
  socket.listen(3000, () => { console.log("Server is ready") })
  ```



