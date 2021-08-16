const io = require("./socket.js");

function Socket(WebSocketURL){
  return new io(WebSocketURL)
}

module.exports = Socket 