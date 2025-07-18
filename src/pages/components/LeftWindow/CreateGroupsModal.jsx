import React, { useState, useCallback } from "react";
import MultiSelect from "../../../components/MultiSelect";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { useMemo } from "react";

const CreateGroupsModal = ({ closeModal, conversations }) => {
  const [newGroupData, setNewGroupData] = useState({
    group_name: "",
    description: "",
    group_members: [],
  });

  const { sendMessage } = useWebSocket();

  const handleCreateGroup = useCallback(() => {
    sendMessage({
      type: "create_group",
      data: newGroupData,
    });
  }, [newGroupData]);

  const groupMembers = useMemo(() => {
    return conversations.map((i) => ({ id: i.id, name: i.username })) ?? [];
  }, [conversations]);

  const handleMemberSelect = useCallback((e) => {
    console.log("handleMemberSelect", e);
    setNewGroupData((prev) => ({
      ...prev,
      group_members: e.map((i) => i.id) ?? [],
    }));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-[500px]">
      <h1 className="text-2xl font-bold">Create Group</h1>
      <input
        type="text"
        placeholder="Group Name"
        className="border border-gray-300 rounded-md p-2 w-full"
        value={newGroupData?.group_name}
        onChange={(e) => {
          setNewGroupData((prev) => ({
            ...prev,
            group_name: e.target.value,
          }));
        }}
      />
      <input
        type="text"
        placeholder="Group Description"
        className="border border-gray-300 rounded-md p-2 w-full"
        value={newGroupData.description}
        onChange={(e) =>
          setNewGroupData({
            ...newGroupData,
            description: e.target.value,
          })
        }
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Group Members</h1>
        <div className="flex flex-row gap-2">
          <MultiSelect options={groupMembers} onChange={handleMemberSelect} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleCreateGroup}
        >
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
  );
};

export default CreateGroupsModal;
