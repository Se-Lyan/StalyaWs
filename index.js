const client = require("./StalyaWs-client/index.js");
const server = require("./StalyaWs-server/index.js");

function socket(type){
	if(!type || type.server === undefined)
	throw new Error("Type can't be undefined or null, Only object");
	
	if(typeof type.server != "boolean")
	throw new Error("Server boolean can't be undefined or null");
	
	if(type.server === true){
		return server;
	} else {
		return client;
	}
}

module.exports = socket