import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ChatHeader from "../ChatHeader";
import TextMessages from "../TextMessage";
import MessageBar from "../MessageBar";
import { getMessages } from "../../../api";

const RightWindow = ({ selectedChats = [], chats = [] }) => {
  console.log("Selected Chats:", selectedChats);

  return (
    <div className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto">
        {false ? (
          <div className="flex h-full gap-4">
            {/* Left Half: Chats with Split View */}
            <div className="w-1/2 bg-white shadow-2xl p-6 rounded-lg flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Chats
              </h3>
              {selectedChats
                .filter(
                  (chat) =>
                    chats.some((c) => c.id === chat.id) &&
                    splitChats.has(chat.id)
                )
                .map((chat) => (
                  <AnimatePresence key={chat.id}>
                    <motion.div
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col h-full"
                    >
                      <ChatHeader />
                      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                        {/* {currentChat.map((msg) => (
                          <TextMessages />
                        ))} */}
                      </div>
                      <form
                        onSubmit={handleSendMessage}
                        className="mt-4 flex items-center"
                      >
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-all duration-300"
                        >
                          <Send />
                        </button>
                      </form>
                    </motion.div>
                  </AnimatePresence>
                ))}
            </div>

            {/* Right Half: Groups with Split View or New Chat */}
            <div className="w-1/2 bg-white shadow-2xl p-6 rounded-lg flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedChats.some(
                  (c) =>
                    groups.some((g) => g.id === c.id) && splitChats.has(c.id)
                )
                  ? "Groups"
                  : "New Chat"}
              </h3>
              {selectedChats
                .filter(
                  (chat) =>
                    groups.some((g) => g.id === chat.id) &&
                    splitChats.has(chat.id)
                )
                .map((chat) => (
                  <AnimatePresence key={chat.id}>
                    <motion.div
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col h-full"
                    >
                      <ChatHeader />
                      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                        {getMessages(chat.id).map((msg) => (
                          <TextMessages />
                        ))}
                      </div>
                      <MessageBar />
                    </motion.div>
                  </AnimatePresence>
                ))}
              {!selectedChats.some(
                (c) => groups.some((g) => g.id === c.id) && splitChats.has(c.id)
              ) &&
                selectedChats.length > 1 && (
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      New Chat
                    </h3>
                    {selectedChats
                      .filter((chat) => !splitChats.has(chat.id))
                      .map((chat) => (
                        <AnimatePresence key={chat.id}>
                          {/* {currentChat?.user_id === chat.user_id && (
                            <motion.div
                              initial={{ x: 300, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: 300, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="flex flex-col h-full"
                            >
                              <ChatHeader />
                              <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                                {getMessages(chat.id).map((msg) => (
                                  <TextMessages />
                                ))}
                              </div>
                              <MessageBar />
                            </motion.div>
                          )} */}
                        </AnimatePresence>
                      ))}
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
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
                    <ChatHeader chat={chat} />
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                      <TextMessages chat={chat} />
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
