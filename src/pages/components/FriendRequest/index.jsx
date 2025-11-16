import { Check, X } from "lucide-react";
import React, { useCallback } from "react";
import { acceptRequest, rejectRequest } from "../../../controllers/user";

const FriendRequests = ({
  friendRequests,
  setFriendRequests,
  setFriendsList,
}) => {
  const acceptFriendRequest = useCallback(
    async (id) => {
      await acceptRequest(id);
      let newlyAddedFriend = friendRequests.find((i) => i._id === id);
      setFriendsList((prev) => [...prev, newlyAddedFriend]);
      setFriendRequests((prev) => prev.filter((i) => i._id !== id));
    },
    [setFriendRequests, setFriendsList, friendRequests]
  );

  const rejectFriendRequest = useCallback(
    async (id) => {
      await rejectRequest(id);
      setFriendRequests((prev) => prev.filter((i) => i._id !== id));
    },
    [setFriendRequests]
  );

  return (
    <details className="w-full bg-white rounded-lg p-4 shadow-md group">
      <summary className="text-lg font-semibold mb-1 cursor-pointer list-none flex items-center justify-between">
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
      </summary>
      <div className="overflow-hidden transition-all duration-200 ease-in-out">
        <div className="flex flex-col items-center justify-center gap-2">
          {friendRequests.map((friendRequest) => (
            <div
              key={friendRequest._id}
              className="w-full bg-gray-100 rounded-md animate-fadeIn p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${friendRequest.full_name}`}
                    alt={friendRequest.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="text-sm font-semibold">
                      {friendRequest.full_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      @{friendRequest.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-blue-500 text-white p-1 rounded-md cursor-pointer"
                    onClick={() => acceptFriendRequest(friendRequest._id)}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded-md cursor-pointer"
                    onClick={() => rejectFriendRequest(friendRequest._id)}
                  >
                    <X size={16} />
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

export default React.memo(FriendRequests);
