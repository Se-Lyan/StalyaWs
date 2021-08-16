const URL = require("url")


module.exports = url


function url(WebSocketURL){
  if(WebSocketURL === null || WebSocketURL === undefined)
   throw new Error("WebSocketURL can't be undefined or null");

 const hostname = URL.parse(WebSocketURL, true).hostname
 const port = URL.parse(WebSocketURL, true).port

 if(hostname === null || hostname === undefined || port === null || port === undefined)
throw new Error("WebSocketURL port or hostname can't be undefined or null");

  return {hostname: hostname, port: port }
}