import React, { use } from "react";

const ChatHeader = ({ chat = {}, full_name }) => {
  return (
    <div className="flex items-center mb-4 border-b pb-2">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <h2 className="text-xl font-semibold text-gray-800">{chat.full_name}</h2>
    </div>
  );
};

export default ChatHeader;
