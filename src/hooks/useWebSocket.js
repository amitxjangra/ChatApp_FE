// websocket.js
let socketInstance = null;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = new WebSocket("ws://localhost:5000");

    socketInstance.onopen = () => {
      console.log("WebSocket connected!");
    };

    socketInstance.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    socketInstance.onclose = () => {
      console.log("WebSocket disconnected");
      socketInstance = null; // Optional: clear instance if needed
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  return socketInstance;
}
