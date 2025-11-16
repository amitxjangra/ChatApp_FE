import { useState } from "react";
import {
  createSocket,
  getSocket,
  disconnectSocket,
} from "../utils/socketManager";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  const connectSocket = () => {
    const socket = createSocket();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });
  };

  const disconnect = () => {
    disconnectSocket();
    setConnected(false);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: getSocket(),
        connectSocket,
        disconnectSocket: disconnect,
        connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
