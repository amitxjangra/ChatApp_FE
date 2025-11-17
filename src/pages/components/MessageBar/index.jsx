import { Send } from "lucide-react";
import React, { useCallback } from "react";
import useSocket from "../../../hooks/useWebSocket";

const MessageBar = ({ chat, setChats }) => {
  const { socket } = useSocket();
  const [message, setMessage] = React.useState("");
  const userId = localStorage.getItem("user_id");

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (message.trim() === "") return;

      const messageData = {
        target: chat._id.toString(),
        message,
        sender: userId,
      };

      socket.emit("sendPersonalMessage", messageData);
      setChats((prev) => ({
        ...prev,
        chats: [
          ...(prev.chats ?? []),
          { ...messageData, sentAt: new Date().toISOString() },
        ],
      }));
      setMessage("");
    },
    [message, chat._id, userId, socket, setChats]
  );

  return (
    <form
      onSubmit={handleSendMessage}
      id="message-bar"
      className=" flex items-center sticky bottom-0 bg-white py-4"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage(e);
          }
        }}
      />
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-all duration-300"
      >
        <Send />
      </button>
    </form>
  );
};

export default MessageBar;
