import React, { useCallback, useState } from "react";
import { Plus, Settings, Users, X } from "lucide-react";
import { motion } from "framer-motion";
//import { useWebSocket } from "../../../hooks/useWebSocket";
import useModal from "../../../components/Modal/useModal";

import CreateGroupsModal from "./CreateGroupsModal";
import GroupSettingModal from "./GroupSettingModal";

const Groups = ({
  groups = [],
  selectedChats,
  setSelectedChats,
  conversations,
}) => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const { openModal, closeModal } = useModal();

  const { sendMessage } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    switch (type) {
      case "group_chat_message":
        setSelectedChats((prev) => {
          let prevChat = prev.find((i) => i?.id === data?.[0]?.group_id);
          if (prevChat) {
            return prev.map((i) => {
              if (i?.group_id === data?.[0]?.group_id) {
                return {
                  ...i,
                  chats: data,
                };
              }
              return i;
            });
          }
          return [
            ...prev,
            {
              type: "group",
              id: selectedGroup.group_id,
              chats: data,
              group_name: selectedGroup.group_name,
              group_avatar: selectedGroup.group_avatar,
            },
          ];
        });
        break;

      default:
        break;
    }
  });

  const handleToggleChat = useCallback(
    (group) => {
      setSelectedGroup(group);
      sendMessage({
        type: "get_group_chat",
        data: group.group_id,
      });
    },
    [sendMessage]
  );

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Users className="mr-2" /> Groups{" "}
        <button
          className="ml-auto cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() =>
            openModal(
              "group-modal",
              <CreateGroupsModal
                closeModal={closeModal}
                conversations={conversations}
              />
            )
          }
        >
          <Plus className="w-4 h-4 cursor-pointer text-white self-center" />{" "}
        </button>
      </h2>
      <div className="space-y-2">
        {groups.map((group) => (
          <motion.div
            key={group.group_id}
            className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => handleToggleChat(group)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={group.avatar}
              alt={group.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex-1 flex flex-col">
              <span className="text-gray-700 flex-1">{group.group_name}</span>
              {group.last_message && (
                <span className="text-gray-500 text-sm">
                  {group.last_message}
                </span>
              )}
            </div>
            <div
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                openModal(
                  "group-modal",
                  <GroupSettingModal closeModal={closeModal} group={group} />
                );
              }}
            >
              <Settings className="w-4 h-4 cursor-pointer hover:text-red-700 text-gray-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Groups;
