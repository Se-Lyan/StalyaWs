const net = require("net");
const socket = new net.Socket();
const url = require("./url.js");
const time = require("./time.js");
const color = require("chalk");
const toArray = require("to-array");

const Logs = []



class Socket {
  constructor(WebSocketURL, Options){
    this.connected = false
    this.disconnected = true
    this.host = { hostname: null, port: null }
    this.default_events = ["connect", "error", "disconnect"]
    this.logs = function(){ return Logs }
    this.events = {} 

   this.host.hostname = url(WebSocketURL).hostname
   this.host.port = url(WebSocketURL).port

  
    socket.connect(this.host.port, this.host.hostname, () => {
       this.connected = true
       this.disconnected = false

         Logs.push({time: time(), message: "Connection to " + this.host.hostname + ":" + this.host.port + " successful", error: false})
           if(this.events.connect != undefined) this.events.connect();

             socket.on("close", () => {          
             Logs.push({time: time(), message: "Disconnected from " + this.host.hostname + ":" + this.host.port, error: false})
              this.connect = false;
              this.disconnected = true; 
               if(this.events.disconnect != undefined) this.events.disconnect();                 
            })

            socket.on("error", (err) => {
              Logs.push({time: time(), message: "Error: " + err, error: true})
              if(this.events.error != undefined) this.events.error(err);
            })

           socket.on("data", (data) => {            
             data = JSON.parse(data.toString())             
             Logs.push({time: time(), message: "Received data from " + this.host.hostname + ":" + this.host.port + " (Event: " + data.event_name + " |  Argument Number: " + data.data.length + ")", error: false})
              if(this.events[data.event_name]){ this.events[data.event_name].apply(null, data.data) }
           })
        })
        
     }

    
    on(event_name, callback){
     this.events[event_name] = callback;
   }

   emit(event_name){
     
     var args = toArray(arguments) 
      delete args[0]
     args = args.filter(function (arg) { return arg != null; })
     

     const data = JSON.stringify({event_name: event_name, data: args})
     
     socket.write(data)
   }

}

module.exports = Socket



