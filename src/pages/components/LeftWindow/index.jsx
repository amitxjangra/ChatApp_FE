import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Chats from "./Chats";
import Groups from "./Groups";
import UserSearch from "../UserSearch";

const LeftWindow = ({
  setIsSidebarOpen,
  isSidebarOpen,
  chats,
  selectedChats,
  groups,
  setSelectedChats,
}) => {
  return (
    <>
      <motion.button
        className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>
      <motion.div
        className={`bg-white/90 shadow-2xl border-r border-gray-200 p-4 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-164 md:w-1/3" : "w-0 md:w-0"
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
            <Chats chats={chats} selectedChats={selectedChats} />
            <Groups groups={groups} selectedChats={selectedChats} />
          </>
        )}
      </motion.div>
    </>
  );
};

export default LeftWindow;
