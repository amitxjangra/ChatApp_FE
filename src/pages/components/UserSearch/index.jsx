// components/UserSearch.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, User2, SquarePlus } from "lucide-react";
import { userSeach } from "../../../api";

export default function UserSearch({ setSelectedChats }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await userSeach(encodeURIComponent(query));
      setResults(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
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
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-gray-300 px-2 py-1 rounded-lg focus:outline-none placeholder:text-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-1"
            >
              {results.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 bg-[#2b2b2b] p-2 rounded-lg"
                  onClick={() => {
                    setSelectedChats((prev) => [...prev, user]);
                    console.log(user);
                  }}
                >
                  <User2 className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-200">
                      {user.full_name}
                    </p>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>
                  <SquarePlus
                    className="w-6 h-6 ml-auto text-blue-400 hover:cursor-pointer"
                    onClick={() => sendFriendRequest()}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && results.length === 0 && query && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-gray-800 text-center"
            >
              No users found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
