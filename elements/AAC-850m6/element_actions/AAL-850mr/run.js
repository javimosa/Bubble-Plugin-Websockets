function(instance, properties, context) {
    if (instance.data.socket.readyState !== WebSocket.CLOSED && socket.readyState !== WebSocket.CLOSING) {
    	 	instance.data.socket.send(properties.message);
    } else {
        console.log("Websocket already closed");
    }
}