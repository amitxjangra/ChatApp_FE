import { Send } from "lucide-react";
import React from "react";
import { sendMessage } from "../../../api";
import { getSocket } from "../../../hooks/useWebSocket";
const MessageBar = ({ chat }) => {
  const socket = getSocket();
  const [message, setMessage] = React.useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    socket.send(
      JSON.stringify({
        type: "chat_message",
        sent_to: chat.id,
        message,
      })
    );
  };
  return (
    <form onSubmit={handleSendMessage} className="mt-4 flex items-center">
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
  );
};

export default MessageBar;
