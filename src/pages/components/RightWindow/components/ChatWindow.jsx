import { motion } from "framer-motion";
import ChatHeader from "../../ChatHeader";
import TextMessages from "../../TextMessage";
import MessageBar from "../../MessageBar";
import { useCallback, useEffect, useState, useRef } from "react";
import { fetchGroupChats } from "../../../../controllers/chats";
import useSocket from "../../../../hooks/useWebSocket";

const ChatWindow = ({ chat }) => {
  const { connected, socket } = useSocket();
  const [chats, setChats] = useState([]);
  const messageEndRef = useRef(null);

  const fetchChats = useCallback(async () => {
    const resp = await fetchGroupChats(chat._id);
    setChats(resp);
  }, [chat._id]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (connected) {
      socket.on("receiveMessage", (p) => {
        setChats((prev) => ({ ...prev, chats: [...(prev.chats ?? []), p] }));
      });
    }
  }, [chat._id, connected, socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <motion.div
      className="bg-white shadow-2xl px-6 rounded-lg flex flex-col h-full relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      id={`chat-window-${chat._id}`}
    >
      <ChatHeader chat={chat} />
      <div className="overflow-y-auto space-y-2 p-4 bg-gray-50 rounded-lg">
        <TextMessages chat={chats.chats} members={chat.members} />
        <div ref={messageEndRef} />
      </div>

      <MessageBar chat={chat} setChats={setChats} />
    </motion.div>
  );
};
export default ChatWindow;
