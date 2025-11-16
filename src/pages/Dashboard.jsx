import React, { useState, useEffect } from "react";
import LeftWindow from "./components/LeftWindow";
import RightWindow from "./components/RightWindow";
import useSocket from "../hooks/useWebSocket";
import { useCallback } from "react";
import { fetchChats } from "../controllers/chats";

const ChatApp = () => {
  const { connected, socket } = useSocket();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const getChats = useCallback(async () => {
    const resp = await fetchChats();
    setConversations(resp);
  }, []);

  // const getGroups = useCallback(() => {}, []);
  useEffect(() => {
    getChats();
    // getGroups();
  }, [getChats]);

  useEffect(() => {
    if (connected) {
      socket.on("receiveMessage", (p) => {
        setSelectedChats((prev) =>
          prev.map((chat) => {
            if (chat.user._id.toString() === p.sender) {
              return { ...chat, chats: [...(chat.chats ?? []), p] };
            }
            return chat;
          })
        );
      });
    }
  }, [socket, connected]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
      <LeftWindow
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
        conversations={conversations}
        groups={groups}
        setConversations={setConversations}
        setFriendsList={setFriendsList}
        friendsList={friendsList}
      />

      <RightWindow
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
      />
    </div>
  );
};

export default ChatApp;
