import React, { useState, createContext, useEffect, useRef } from "react";
import LeftWindow from "./components/LeftWindow";
import RightWindow from "./components/RightWindow";
import UserSearch from "./components/UserSearch";
import { useWebSocket } from "../hooks/useWebSocket";

const ChatApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const [groups, setGroups] = useState([]);
  console.log("conversations", selectedChats);
  const { sendMessage, connectionState } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    switch (type) {
      case "get_chats":
        setConversations(data);
        break;
      case "get_groups":
        setGroups(data);
        break;
      case "chat_message":
        // Handle incoming chat message
        const sent_by = data[0].sent_by;
        setSelectedChats((prev) => {
          let newSelectedChats = [...prev];
          let chatExists = newSelectedChats.find((chat) => chat.id === sent_by);
          if (!chatExists) {
            setConversations((prev) =>
              prev.map((i) => ({
                ...i,
                unreadMessages: (i?.unreadMessages ?? 0) + 1,
              }))
            );
          } else {
            chatExists.chats.push(data[0]);
          }
          return newSelectedChats;
        });
        document.getElementById("message-bar").scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "group_chat_message":
        setSelectedChats((prev) => {
          const group_id = data[0].group_id;
          let newSelectedChats = [...prev];
          let groupExists = newSelectedChats.find(
            (chat) => chat.group_id === group_id
          );
          if (groupExists) {
            groupExists.chats.push(data[0]);
          } else {
            setGroups((prev) =>
              prev.map((i) => ({
                ...i,
                unreadMessages: (i?.unreadMessages ?? 0) + 1,
              }))
            );
          }
          return newSelectedChats;
        });
        break;
      default:
        console.log("Unknown message type:", msg);
    }
  });

  useEffect(() => {
    if (connectionState === "open") {
      sendMessage({ type: "get_chats_and_group" });
    }
  }, [connectionState]);
  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
      <LeftWindow
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
        // new ones
        conversations={conversations}
        groups={groups}
        setConversations={setConversations}
      />
      <RightWindow
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
      />
    </div>
  );
};

export default ChatApp;
