import { Check, X } from "lucide-react";
import React, { useState } from "react";
import { useWebSocket } from "../../../hooks/useWebSocket";

const FriendRequests = ({ friendRequests }) => {
  const { sendMessage } = useWebSocket();
  const acceptFriendRequest = (friendRequest) => {
    sendMessage({ type: "accept_friend_request", data: friendRequest });
  };

  return (
    <details className="w-full bg-white rounded-lg p-4 shadow-md group">
      <summary className="text-lg font-semibold mb-1 cursor-pointer list-none flex items-center">
        <div className="flex items-center w-full justify-between">
          Friend Requests
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </summary>
      <div className="overflow-hidden transition-all duration-200 ease-in-out">
        <div className="flex flex-col items-center justify-center gap-2">
          {friendRequests.map((friendRequest) => (
            <div
              key={friendRequest.id}
              className="w-full bg-gray-100 rounded-md animate-fadeIn p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={friendRequest.avatar}
                    alt={friendRequest.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="text-sm font-semibold">
                      {friendRequest.full_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {friendRequest.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-1 py-1 rounded-md cursor-pointer"
                    onClick={() => acceptFriendRequest(friendRequest)}
                  >
                    <Check />
                  </button>
                  <button className="bg-red-500 text-white px-1 py-1 rounded-md cursor-pointer">
                    <X />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {friendRequests.length === 0 && (
            <div className="text-center text-gray-500 font-semibold">
              No friend requests
            </div>
          )}
        </div>
      </div>
    </details>
  );
};

export default FriendRequests;
