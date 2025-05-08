import { Plus } from "lucide-react";
import React from "react";

const InviteMember = ({ closeInviteModal }) => {
  const users = [
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
    { name: "Ram" },
  ];
  return (
    <div className="flex flex-col gap-4 w-[500px]">
      <h1 className="text-2xl font-bold">Invite Members</h1>
      <input
        className=" border p-2 rounded-xl border-gray-400"
        placeholder="Search Users"
      />
      <div className="flex flex-col gap-2">
        {users.map((i) => {
          return (
            <div className="flex s items-center gap">
              <img
                className="w-12 h-12 rounded-full border-1 mr-4"
                src={i?.avatar}
                alt="image broken"
              />
              <span>{i.name}</span>
              <button className="ml-auto btn-p bg-blue-500">
                <Plus />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InviteMember;
