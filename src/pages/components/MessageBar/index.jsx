import { Send } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { useWebSocket } from "../../../hooks/useWebSocket";

const MessageBar = ({ chat }) => {
  console.log("chat", chat);
  const [message, setMessage] = React.useState("");
  const { sendMessage } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    if (type === "group_message_sent_success") {
      console.log("data", data);
    }
  });
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!message) return;
      sendMessage({
        type: chat?.type === "personal" ? "send_message" : "send_group_message",
        data: {
          chatID: chat.id,
          message: message,
        },
      });
      setMessage("");
    },
    [sendMessage, message, chat]
  );
  useEffect(() => {
    scrollToBottom();
  }, [chat]);
  return (
    <form
      onSubmit={handleSendMessage}
      ref={messagesEndRef}
      id="message-bar"
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
  );
};

export default MessageBar;
