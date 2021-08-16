/**
 * Work only if connected
 * No need to initialize socket, avoid multiple connections
**/

exports.emit = function(socket, event_name){
  var data = Array.from(arguments)
  socket.write(JSON.stringify({event_name: event_name, data: data}))
  console.log("data sended")
}