import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Settings, X } from "lucide-react";
import Chats from "./Chats";
import UserSearch from "../UserSearch";
import FriendRequests from "../FriendRequest";
import { logoutUser } from "../../../utils/functions";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../hooks/useWebSocket";
import { useSelector } from "react-redux";

const LeftWindow = ({
  setIsSidebarOpen,
  isSidebarOpen,
  selectedChats,
  setSelectedChats,
  friendsList,
  setFriendsList,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const userProfile = useSelector(({ user }) => user.value.user);
  const { socket, connected, disconnectSocket } = useSocket();

  useEffect(() => {
    if (userProfile?.friends.length) {
      setFriendsList(userProfile.friends);
    }
    if (userProfile?.requests.length) {
      setFriendRequests(userProfile.requests);
    }
  }, [userProfile, setFriendsList]);

  const handleLogout = useCallback(() => {
    logoutUser();
    disconnectSocket();
    navigate("/", { replace: true });
  }, [disconnectSocket, navigate]);

  useEffect(() => {
    if (connected) {
      socket.on("friendRequest", (p) => {
        setFriendRequests((prev) => [...prev, p]);
      });
      socket.on("requestAccepted", (msg) => {
        setFriendsList((prev) => [...prev, msg.user]);
      });
    }
  }, [socket, connected, setFriendsList]);

  return (
    <>
      <motion.button
        className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>

      {/* Settings Button */}
      <motion.button
        className="absolute bottom-4 left-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSettingsOpen((prev) => !prev)}
        aria-label={isSettingsOpen ? "Close settings" : "Open settings"}
      >
        {isSettingsOpen ? <X /> : <Settings />}
      </motion.button>

      {/* Settings Popup */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-4 z-20 bg-white shadow-xl rounded-lg p-4 w-48"
          >
            <ul className="space-y-2 text-sm">
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                Profile
              </li>
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                Settings
              </li>
              <li
                className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`bg-white/90 shadow-2xl border-r border-gray-200 p-4 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-full md:w-1/3" : "w-0"
        }`}
        initial={{ x: -300, opacity: 0 }}
        animate={{
          x: isSidebarOpen ? 0 : -300,
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {isSidebarOpen && (
          <>
            <UserSearch setSelectedChats={setSelectedChats} />
            <Chats
              chatsList={friendsList}
              setSelectedChats={setSelectedChats}
            />
            <FriendRequests
              friendRequests={friendRequests}
              setFriendRequests={setFriendRequests}
              setFriendsList={setFriendsList}
            />
          </>
        )}
      </motion.div>
    </>
  );
};

export default LeftWindow;
