import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { getMessages } from "../../../api";

const TextMessages = ({ chat }) => {
  const [messages, setMessages] = React.useState([]);
  console.log("Chat:", chat);
  useEffect(() => {
    getMessages(chat.id)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log("messages", messages);
  return messages.map((message) => {
    return (
      <motion.div
        key={message.id}
        className={`flex items-end ${
          message.sent_to !== chat.id ? "justify-start" : "justify-end"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`max-w-xs p-3 rounded-lg ${
            message.sent_to === chat.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <p>{message.message}</p>
          <span className="text-xs opacity-70">
            {Date(message.sent_time, "dd-MM-YYY")}
          </span>
        </div>
      </motion.div>
    );
  });
};

export default TextMessages;
