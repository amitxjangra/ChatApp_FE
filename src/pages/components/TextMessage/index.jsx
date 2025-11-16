import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const TextMessages = ({ chat = [], members = [] }) => {
  const userId = localStorage.getItem("user_id");
  const userProfile = useSelector(({ user }) => user.value.user);

  return chat.map((message) => {
    const sender =
      message.senderId === userId
        ? userProfile
        : members.find((member) => member.userId === message.senderId);

    return (
      <motion.div
        key={message.sentAt + message.senderId}
        className={`flex items-end ${
          message.senderId === userId ? "justify-end" : "justify-start"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`max-w-xs p-3 rounded-lg ${
            message.senderId === userId
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <p className="font-bold">{sender?.full_name}</p>
          <p>{message.message}</p>
          <span className="text-xs opacity-70">
            {new Date(message.sentAt).toLocaleTimeString()}
          </span>
        </div>
      </motion.div>
    );
  });
};

export default TextMessages;
