import { Send } from "lucide-react";
import React, { useCallback } from "react";
import useSocket from "../../../hooks/useWebSocket";

const MessageBar = ({ chat, setSelectedChats }) => {
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
      setMessage("");
    },
    [socket, chat._id, message, userId]
  );

  return (
    <form
      onSubmit={handleSendMessage}
      id="message-bar"
      className="mt-4 flex items-center"
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
