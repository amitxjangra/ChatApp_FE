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
  const [friendRequests, setFriendRequests] = useState([]);
  const { sendMessage, connectionState } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    switch (type) {
      case "get_chats":
        console.log("data", data);
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
          console.log("data", prev, data);

          const group_id = data?.[0]?.group_id;
          let newSelectedChats = [...prev];
          let groupExists = newSelectedChats.find(
            (chat) => chat.id === group_id
          );
          if (groupExists) {
            groupExists.chats = data;
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
      case "get_friend_requests":
        console.log("dataf", data);
        setFriendRequests((prev) => {
          console.log("prev", prev);
          return [...prev, ...data];
        });
        break;
      case "accept_friend_request":
        alert("You are now friends");
        setFriendRequests((prev) =>
          prev.filter((request) => request.id !== data.id)
        );
        break;
      default:
        console.log("Unknown message type:", msg);
        break;
    }
  });

  useEffect(() => {
    if (connectionState === "open") {
      sendMessage({ type: "get_chats_and_group" });
      sendMessage({ type: "get_friend_requests" });
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
        friendRequests={friendRequests}
      />
      <RightWindow
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
      />
    </div>
  );
};

export default ChatApp;
