import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, User2, SquarePlus } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  fetchUsersByNameOrEmail,
  sendFriendRequest,
} from "../../../controllers/user";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUser = useCallback(async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    const userList = await fetchUsersByNameOrEmail(query);
    setResults(userList);
    setLoading(false);
  }, []);

  const debouncedSearchUser = useDebounce(searchUser, 500);

  const handleUserType = (val) => {
    setQuery(val);
    debouncedSearchUser(val);
  };

  const sendRequest = (user) => {
    sendFriendRequest(user._id);
  };

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <h2 className="text-lg font-semibold mb-1">Search Users</h2>
        <div className="flex items-center space-x-1">
          <input
            type="text"
            placeholder="Enter username or email"
            value={query}
            onChange={(e) => handleUserType(e.target.value)}
            className="flex-1 bg-gray-100 px-2 py-1 rounded-lg focus:outline-none placeholder:text-gray-500"
          />
          <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition-colors text-white">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-1"
          >
            {results.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg"
              >
                <User2 className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-800">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
                <SquarePlus
                  className="w-6 h-6 ml-auto text-blue-500 hover:cursor-pointer"
                  onClick={() => sendRequest(user)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && results.length === 0 && query && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-gray-500 text-center"
          >
            No users found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
