import React, { useCallback, useState } from "react";
import { Pencil, Plus, Settings, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import { useWebSocket } from "../../../hooks/useWebSocket";
import useModal from "../../../components/Modal/useModal";
import MultiSelect from "../../../components/MultiSelect";
const Groups = ({ groups = [], selectedChats, setSelectedChats }) => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const { openModal, closeModal } = useModal();
  const [newGroupData, setNewGroupData] = useState({
    group_name: "",
    group_description: "",
    group_members: [],
  });
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

  const handleCreateGroup = useCallback(() => {
    sendMessage({
      type: "create_group",
      data: newGroupData,
    });
  }, [newGroupData, sendMessage]);

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Users className="mr-2" /> Groups{" "}
        <button
          className="ml-auto cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() =>
            openModal(
              <div className="flex flex-col gap-4 w-[500px]">
                <h1 className="text-2xl font-bold">Create Group</h1>
                <input
                  type="text"
                  placeholder="Group Name"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newGroupData.group_name}
                  onChange={(e) =>
                    setNewGroupData({
                      ...newGroupData,
                      group_name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Group Description"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newGroupData.group_description}
                  onChange={(e) =>
                    setNewGroupData({
                      ...newGroupData,
                      group_description: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg font-semibold">Group Members</h1>
                  <div className="flex flex-row gap-2">
                    <MultiSelect />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <button className="cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create
                  </button>
                  <button
                    className="cursor-pointer flex flex-row gap-2 self-center bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
                  <div className="flex flex-col gap-4 w-[500px]">
                    <h1 className="text-2xl font-bold">Group Settings</h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2 items-center self-center relative flex-1 w-max">
                        <img
                          src={group.avatar}
                          alt={group.name}
                          className="w-30 h-30 rounded-full"
                        ></img>
                        <Pencil className="absolute top-0 right-0 w-4 h-4 cursor-pointer hover:text-red-700 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg font-semibold">Group Name</h1>
                      <input
                        className="border border-gray-300 rounded-md p-2 w-full self-center"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg font-semibold">
                        Group Description
                      </h1>
                      <input
                        className="border border-gray-300 rounded-md p-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <h1 className="text-lg font-semibold flex-1 ">
                          Group Members
                        </h1>
                        <button className="cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md">
                          <Plus className="w-4 h-4 cursor-pointer text-white self-center" />{" "}
                          Invite
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        {group.users.map((member) => (
                          <div
                            key={member.id}
                            className="flex flex-row gap-2 w-full pb-2 hover:bg-gray-100 transition-all duration-300 px-2 py-2"
                          >
                            <div className="flex flex-row gap-2">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1 text-gray-800 self-center text-lg">
                                {member.full_name}
                              </div>
                            </div>
                            <select className="flex-1 rounded-md p-2 ml-auto max-w-40 h-10 outline-none border-none bg-gray-300">
                              <option
                                className="text-gray-500 hover:bg-gray-100 h-10"
                                value="admin"
                              >
                                Admin
                              </option>
                              <option
                                className="text-gray-500 hover:bg-gray-100 h-10"
                                value="member"
                              >
                                Member
                              </option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
