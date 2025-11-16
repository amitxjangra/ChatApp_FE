import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ChatWindow from "./components/ChatWindow";

const RightWindow = ({ selectedChats = [] }) => {
  return (
    <div className="w-full p-4 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto">
        {selectedChats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {selectedChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatWindow chat={chat} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="flex items-center justify-center h-full text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Select a chat or group to start messaging
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RightWindow;
