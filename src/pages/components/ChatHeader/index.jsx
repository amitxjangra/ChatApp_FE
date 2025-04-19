import React, { use } from "react";

const ChatHeader = ({ chat = {}, setSelectedChats }) => {
  const removeChat = () => {
    setSelectedChats((prev) => prev.filter((c) => c.id !== chat.id));
  };
  console.log("chat", chat);

  return (
    <div className="flex items-center mb-4 border-b pb-2">
      <img
        src={chat.type === "group" ? chat.group_avatar : chat.avatar}
        alt={chat.type === "group" ? chat.group_name : chat.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {chat.type === "group" ? chat.group_name : chat.full_name}
      </h2>
      <button
        className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:cursor-pointer group"
        onClick={removeChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-all duration-200 transform active:scale-90"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatHeader;
