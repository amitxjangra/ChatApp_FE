// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";
import {
  getSocket,
  addMessageListener,
  removeMessageListener,
} from "../utils/socketManager";

const readyStateMap = {
  [WebSocket.CONNECTING]: "connecting",
  [WebSocket.OPEN]: "open",
  [WebSocket.CLOSING]: "closing",
  [WebSocket.CLOSED]: "closed",
};

export function useWebSocket(onMessage) {
  const socketRef = useRef(null);
  const handlerRef = useRef(onMessage);
  const [connectionState, setConnectionState] = useState("connecting");

  useEffect(() => {
    handlerRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    // Set initial state
    setConnectionState(readyStateMap[socket.readyState]);

    const handleMessage = (event) => {
      handlerRef.current?.(event.data);
    };

    const handleOpen = () => setConnectionState("open");
    const handleClose = () => setConnectionState("closed");
    const handleError = () => setConnectionState("error");

    addMessageListener(handleMessage);
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      removeMessageListener(handleMessage);
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
    };
  }, []);

  const sendMessage = (message) => {
    const socket = socketRef.current;
    const data =
      typeof message === "string" ? message : JSON.stringify(message);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    } else {
      console.warn("WebSocket not connected.");
    }
  };

  return { sendMessage, connectionState };
}
