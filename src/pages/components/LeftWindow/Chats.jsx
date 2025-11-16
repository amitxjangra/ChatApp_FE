import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const Chats = ({ chatsList, setSelectedChats }) => {
  const handleChatSelect = useCallback(
    (chat) => {
      setSelectedChats((prev) => {
        if (prev.find((c) => c._id === chat._id)) {
          return prev;
        }
        return [...prev, chat];
      });
    },
    [setSelectedChats]
  );

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="mr-2" /> Chats
      </h2>
      <div className="space-y-2 mb-6">
        {chatsList.map((chat, idx) => (
          <motion.div
            key={`${chat.username}-${chat._id}-${idx}`}
            className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => handleChatSelect(chat)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.full_name}`}
              alt={chat.full_name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-gray-700 flex-1">{chat.full_name}</span>
            {chat.unreadMessages > 0 && (
              <span className="bg-green-300 text-xs font-semibold w-[24px] h-[24px] align-center justify-center rounded-full">
                {chat.unreadMessages}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Chats;
