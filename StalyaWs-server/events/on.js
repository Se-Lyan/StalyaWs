/**
 * connection is not possible to use, its only used for the onconnect event.
 * No need to initialize socket, avoid multiple connections
 **/

exports.on = function(socket, event_name, callbackFunction){
if(!callbackFunction)
 return console.warn(color.red("ERROR: Your callback function is undefined, callback function will not be call."))

 this[event_name] = callbackFunction;
}

