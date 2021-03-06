const net = require("net");
const socket = net
const url = require("./url.js");
const time = require("./time.js");
const color = require("chalk");
const toArray = require("to-array");

var Logs = []
var self = null;

var server = socket.createServer();

module.exports = Socket

 function Socket(){
    this.default_events = ["connection", "error", "disconnection"]
    this.logs = function(){ return Logs }
    this.connections = []
    this.connectionsLength = 0
    this.events = {}
    this.rooms = {}
    
    server.on("connection", client => {
    	self = client;
    	const clientId = Date.now()
        
    	this.connections.push({ clientId: clientId, clientIo: client})
        this.connectionsLength++;
    
    	if(this.events.connection)
          this.events.connection({ 
           ipAddress: client.remoteAddress,
           clientIo: client,
           clientId: clientId,
           emit: this.emit,
           on: this.on
         });
         
        client.on("end", () => {        	
        	this.connections = this.connections.filter(connection => connection.clientId != clientId)          
            this.connectionsLength--;
        	if(this.events.disconnection) this.events.disconnection(clientId);
        })
        
    })
 }
 
 Socket.prototype.listen = function(port, callback){
 	server.listen(port, () => { if(callback) callback(); })
 }
 
 Socket.prototype.on = function(event_name, callback){
 	  this.events[event_name] = callback;
  }
  
  Socket.prototype.emit = function(event_name){
        var args = toArray(arguments); delete args[0];        
        args = args.filter(function (arg) { return arg != null; })
     
      const data = JSON.stringify({event_name: event_name, data: args})
      self.write(data)
  }
  
  Socket.prototype.emitAll = function(event_name, isRoom){ 	
  if(typeof isRoom != "boolean") throw new Error("isRoom can't be undefined or null or anything else, only boolean. (Specified type: " + typeof isRoom + ")"); 
  
       var args = toArray(arguments); delete args[0];        
        args = args.filter(function (arg) { return arg != null; })
     
      const data = JSON.stringify({event_name: event_name, data: args})	
  
    if(isRoom === true){
    	for(var clients in this.rooms){
    	 for(var client in clients){
  	    client.clientIo.write(data);      
         } 
  	}
    } else {
  	for(var client of this.connections){
  	   client.clientIo.write(data);       
     	}
     }
  }
  
  // +=======ROOMS=======+
  
  Socket.prototype.createRoom = function(room_name, overwrite_room_if_exist = false){
  if(typeof room_name != "string") throw new Error("Room name can't be undefined or null or anything else, only string. (Specified type: " + typeof isRoom + ")");

   if(this.rooms[room_name] && overwrite_room_if_exist === false){
   	console.log(color.yellow("You have set 'overwrite the room if it exists' to false, no changes have been made to " + room_name));
     } else {
     this.rooms[room_name] = {};
   }
}

Socket.prototype.joinRoom = function(room_name, clientId){
	if(this.rooms[room_name] === undefined)
	return;
	
	if(this.rooms[room_name][clientId] != undefined)
	return;
	
	this.rooms[room_name][clientId] = {clientId: clientId, clientIo: this.connections.filter(client => client.clientId === clientId)[0].clientIo}
}

Socket.prototype.emitRoomClient = function(room_name, event_name, clientId){
	if(this.rooms[room_name] === undefined)
	return;
	
	if(this.rooms[room_name][clientId] === undefined)
	return;
	
	var args = toArray(arguments); 
   delete args[0];   
   delete args[1];     
   delete args[2];
    args = args.filter(function (arg) { return arg != null; })
     
        const data = JSON.stringify({event_name: event_name, data: args})	
     this.rooms[room_name][clientId].clientIo.write(data);
}

Socket.prototype.deleteRoom = function(room_name){
	if(this.rooms[room_name] === undefined) return;
	
	delete this.rooms[room_name]
}