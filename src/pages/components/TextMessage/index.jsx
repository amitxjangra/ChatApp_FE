import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TextMessages = ({ chat = [] }) => {
  let userId = localStorage.getItem("user_id");

  return chat.map((message) => {
    return (
      <motion.div
        key={message.sent_time + message.id}
        className={`flex items-end ${
          message.sent_by === Number(userId) ? "justify-end" : "justify-start"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`max-w-xs p-3 rounded-lg ${
            message.sent_to == +userId
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
