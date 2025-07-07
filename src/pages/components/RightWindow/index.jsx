import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import ChatHeader from "../ChatHeader";
import TextMessages from "../TextMessage";
import MessageBar from "../MessageBar";

const RightWindow = ({ selectedChats = [], chats = [], setSelectedChats }) => {
  const [message, setMessage] = React.useState("");
  const handleSendMessage = () => {};
  useEffect(() => {
    if (document.getElementById("message-bar")) {
      document.getElementById("message-bar").scrollIntoView({
        behavior: "smooth",
      });
    }
  });
  return (
    <div className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto">
        {selectedChats.length > 1 ? (
          <div className="flex h-full gap-4">
            {selectedChats.map((chat) => (
              <div className="w-1/2 bg-white shadow-2xl p-6 rounded-lg flex flex-col">
                <AnimatePresence key={chat.id}>
                  <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    <ChatHeader
                      chat={chat}
                      setSelectedChats={setSelectedChats}
                    />
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                      <TextMessages chat={chat.chats} />
                    </div>
                    <MessageBar chat={chat} />
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
            {selectedChats.map((chat) => (
              <AnimatePresence key={chat.id}>
                {true && (
                  <motion.div
                    className="bg-white shadow-2xl p-6 rounded-lg flex flex-col h-full"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ChatHeader
                      chat={chat}
                      setSelectedChats={setSelectedChats}
                    />
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                      <TextMessages chat={chat.chats} />
                    </div>
                    <MessageBar chat={chat} />
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
            {!selectedChats.length && (
              <motion.div
                className="flex items-center justify-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Select a chat or group to start messaging
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightWindow;
