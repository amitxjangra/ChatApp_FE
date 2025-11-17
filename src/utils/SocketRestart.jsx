import { useEffect } from "react";
import axios from "axios";
import useSocket from "../hooks/useWebSocket";

const SocketRestart = () => {
  const { connectSocket } = useSocket();

  useEffect(() => {
    const reconnectSocketIfAuthenticated = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });
        console.log("Auth check response:", res.data);

        if (res?.authenticated && res?.user?._id) {
          const userId = res.user._id;

          // Connect the socket
          const socket = connectSocket();

          // Once connected, emit userId to server
          socket.on("connect", () => {
            socket.emit("register", userId);
          });
        }
      } catch (err) {
        console.log("User not authenticated");
      }
    };

    reconnectSocketIfAuthenticated();
  }, []);

  return null;
};

export default SocketRestart;
