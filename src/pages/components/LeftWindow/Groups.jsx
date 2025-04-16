import React, { useCallback } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { sendMessage } from "../../../api";
import { useWebSocket } from "../../../hooks/useWebSocket";

const Groups = ({ groups = [], selectedChats, setSelectedChats }) => {
  const { sendMessage } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    switch (type) {
      case "group_chat_message":
        setSelectedChats((prev) => {
          let prevChat = prev.find((i) => i?.group_id === data?.[0]?.group_id);
          if (prevChat) {
            return prev.map((i) => {
              if (i?.group_id === data?.[0]?.group_id) {
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
              type: "group",
              id: data?.[0]?.group_id,
              chats: data,
            },
          ];
        });
        break;

      default:
        console.log("Unknown message type:", msg);
    }
  });

  const handleToggleChat = useCallback(
    (group) => {
      sendMessage({
        type: "get_group_chat",
        data: group.group_id,
      });
    },
    [sendMessage]
  );
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Users className="mr-2" /> Groups
      </h2>
      <div className="space-y-2">
        {groups.map((group) => (
          <motion.div
            key={group.group_id}
            className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => handleToggleChat(group)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={group.avatar}
              alt={group.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex-1 flex flex-col">
              <span className="text-gray-700 flex-1">{group.group_name}</span>
              {group.last_message && (
                <span className="text-gray-500 text-sm">
                  {group.last_message}
                </span>
              )}
            </div>
            {selectedChats.some((c) => c.id === group.id) && (
              <span className="text-green-500 mr-2">✓</span>
            )}
            {selectedChats.length === 1 && (
              <motion.button
                className="p-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSplitView(group.id);
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

export default Groups;
