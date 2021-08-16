# StalyaWs

Welcome to Stalya WebSocket for nodejs

You can't use the library **client** without the library **server** and currently only for **small** project.

Statut: in progress (20/100%)

## Get Started

### Server side example

```javascript
const socket = require("StalyaWs")({server: true}) // <--- Everytime true if its the server !

//When client connecting to server, you can add a callback
socket.on("connection", client => {
  console.log("New client connection !");
})
```

### Client side example

```javascript
const socket = require("StalyaWs")({server: false}) // <--- Everytime false if its the client ! 

//When the connection to the server is established, you can add a callback
socket.on("connect", () => {
 console.log("Connection to server established !");
})
```