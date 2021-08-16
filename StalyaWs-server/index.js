const io = require("./socket.js");

function Socket(){
	
  return new io()
}

module.exports = Socket()