function(instance, properties, context) {
    
  const socketUrl = properties.websocket_url;
  const socket = new WebSocket(socketUrl);
  instance.publishState("connection_state", "connecting")

  socket.onopen = function (event) {
    console.log("WebSocket connection established.");
    instance.data.socket = socket;
    instance.triggerEvent("connected")
    instance.publishState("connection_state", "connected")

  };

  socket.onmessage = function (event) {
    console.log("Message from server: ", event.data);
    instance.publishState("message_received", event.data);
    instance.triggerEvent("message_received");

  };
  // Event: When the WebSocket connection is closed
  socket.onclose = function (event) {
    console.log("WebSocket connection closed.");
    instance.triggerEvent("closed")
    instance.publishState("connection_state", "closed")
  };

  // Event: When an error occurs
  socket.onerror = function (error) {
    instance.triggerEvent("an_error_has_ocurred")
    console.error("WebSocket error:", error);
  };
}
