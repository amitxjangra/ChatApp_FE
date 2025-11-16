import React, { useCallback, useState } from "react";
import { Pencil, Plus, Trash } from "lucide-react";
//import { useWebSocket } from "../../../hooks/useWebSocket";
import useModal from "../../../components/Modal/useModal";
import InviteMember from "./InviteMember";

const GroupSettingModal = ({ group = {}, closeModal }) => {
  const [membersList, setMembersList] = useState(group?.users || []);
  const [groupData, setGroupData] = useState({
    group_name: group?.group_name || "",
    description: group?.description || "",
    group_id: group?.group_id,
  });
  const [kicked, setKicked] = useState(false);
  const { openModal, closeModal: closeInviteModal } = useModal("invite-modal");

  const { sendMessage } = useWebSocket((msg) => {
    let parsedMessage = JSON.parse(msg);
    let { type, data } = parsedMessage;
    if (type === "get_groups") {
      if (!data.length) {
        setKicked(true);
      } else {
        setMembersList(data.find((i) => i.group_id === group?.group_id).users);
      }
    }
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage({ type: "update_group", data: groupData });
    },
    [groupData]
  );

  const kickUser = useCallback((id) => {
    sendMessage({
      type: "remove_user_from_group",
      data: { group_id: group?.group_id, removed_user: id },
    });
  }, []);
  if (kicked) return <>You have been kicked from this group</>;
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 w-[500px]">
        <h1 className="text-2xl font-bold">Group Settings</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-center self-center relative flex-1 w-max">
            <img
              src={group?.avatar}
              alt={group?.group_name}
              className="w-30 h-30 rounded-full border-1"
            />
            <Pencil className="absolute top-0 right-0 w-4 h-4 cursor-pointer hover:text-red-700 text-gray-500" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Group Name</h1>
          <input
            id="group_name"
            name="group_name"
            className="border border-gray-300 rounded-md p-2 w-full self-center"
            type="text"
            value={groupData.group_name}
            onChange={(e) =>
              setGroupData((prev) => ({ ...prev, group_name: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Group Description</h1>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            value={groupData?.description}
            onChange={(e) =>
              setGroupData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="text-lg font-semibold flex-1 ">Group Members</h1>
            <button
              className="cursor-pointer flex flex-row gap-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() =>
                openModal(
                  "invite-modal",
                  <InviteMember closeInviteModal={closeInviteModal} />
                )
              }
            >
              <Plus className="w-4 h-4 cursor-pointer text-white self-center" />{" "}
              Invite
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {membersList?.map((member) => (
              <div
                key={member.id}
                className="flex flex-row gap-2 w-full pb-2 hover:bg-gray-100 transition-all duration-300 px-2 py-2 pr-0"
              >
                <div className="flex flex-row gap-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-1"
                  />
                  <div className="flex-1 text-gray-800 self-center text-lg">
                    {member.full_name}
                  </div>
                </div>
                <select
                  className="flex-1 rounded-md p-2 ml-auto max-w-40 h-10 outline-none border-none bg-gray-300"
                  value={member.rights}
                >
                  <option
                    className="text-gray-500 hover:bg-gray-100 h-10"
                    value="ADMIN"
                  >
                    Admin
                  </option>
                  <option
                    className="text-gray-500 hover:bg-gray-100 h-10"
                    value="MEMBER"
                  >
                    Member
                  </option>
                </select>

                <button
                  className="btn-p bg-red-400 hover:bg-red-500"
                  onClick={() => kickUser(member.id)}
                >
                  <Trash size={"16px"} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-p bg-blue-500 ml-auto" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default GroupSettingModal;
