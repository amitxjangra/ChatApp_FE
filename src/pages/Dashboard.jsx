import React, { useState, useEffect, useRef } from "react";
import LeftWindow from "./components/LeftWindow";
import RightWindow from "./components/RightWindow";
import UserSearch from "./components/UserSearch";
import { getSocket } from "../hooks/useWebSocket";
const ChatApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const socket = getSocket(); // Replace with actual user ID

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getConversations();
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
      <LeftWindow
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        chats={[]}
        selectedChats={selectedChats}
        groups={[]}
        setSelectedChats={setSelectedChats}
      />
      <RightWindow selectedChats={selectedChats} />
    </div>
  );
};

export default ChatApp;
