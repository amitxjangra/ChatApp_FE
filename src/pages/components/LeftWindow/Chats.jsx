import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useWebSocket } from "../../../hooks/useWebSocket";
const Chats = ({ conversations, selectedChats, setSelectedChats }) => {
  const { sendMessage, connectionState } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data, extra_data } = parsedMessage;
    switch (type) {
      case "get_chat_data":
        setSelectedChats((prev) => {
          let prevChat = prev.find((i) => i.id === extra_data.chatID);
          if (prevChat) {
            return prev.map((i) => {
              if (i.id === extra_data.chatID) {
                return {
                  ...i,
                  chats: data,
                };
              }
              return i;
            });
          }
          return [
            ...prev,
            {
              type: "personal",
              id: extra_data.chatID,
              chats: data,
            },
          ];
        });
        break;

      default:
        console.log("Unknown message type:", msg);
    }
  });
  const handleChatSelect = useCallback(
    (receiver) => {
      sendMessage({
        type: "get_chat",
        data: receiver.id,
      });
    },
    [sendMessage]
  );

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="mr-2" /> Chats
      </h2>
      <div className="space-y-2 mb-6">
        {conversations.map((chat, idx) => (
          <motion.div
            key={`${chat.username}-${chat.id}-${idx}`}
            className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => handleChatSelect(chat)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={
                chat.profile_image ||
                "https://randomuser.me/api/portraits/men/1.jpg"
              }
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-gray-700 flex-1">{chat.full_name}</span>
            {chat.unreadMessages > 0 && (
              <span className="bg-green-300 text-xs font-semibold w-[24px] h-[24px] align-center justify-center rounded-full">
                {chat.unreadMessages}
              </span>
            )}
            {selectedChats.length === 1 && (
              <motion.button
                className="p-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSplitView(chat.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Chats;
