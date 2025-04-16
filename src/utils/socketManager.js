// src/utils/socketManager.js
let socketInstance = null;
let reconnectInterval = null;
const messageListeners = new Set();

export function getSocket() {
  const token = localStorage.getItem("token");

  if (!socketInstance || socketInstance.readyState === WebSocket.CLOSED) {
    socketInstance = new WebSocket(`ws://localhost:5000?token=${token}`);

    socketInstance.onopen = () => {
      console.log("WebSocket connected!");
      clearInterval(reconnectInterval);
    };

    socketInstance.onmessage = (event) => {
      messageListeners.forEach((cb) => cb(event));
    };

    socketInstance.onclose = () => {
      console.log("WebSocket disconnected");
      socketInstance = null;
      reconnectInterval = setInterval(() => {
        console.log("Attempting to reconnect...");
        getSocket();
      }, 5000);
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  return socketInstance;
}

export function addMessageListener(listener) {
  messageListeners.add(listener);
}

export function removeMessageListener(listener) {
  messageListeners.delete(listener);
}
