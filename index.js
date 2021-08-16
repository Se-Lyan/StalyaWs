const client = require("./StalyaWs-client/index.js");
const server = require("./StalyaWs-server/index.js");

function socket(type){
	if(!type || type.server === undefined)
	throw new Error("Type (Client or Server) can't be undefined or null, Only object");
	
	if(typeof type.server != "boolean")
	throw new Error("Type (Client or Server) can't be undefined or null, Only object");
	
	if(type.server === true){
		return server;
	} else {
		return client;
	}
}

module.exports = socket