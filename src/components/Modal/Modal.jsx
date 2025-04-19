import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "./ModalPortal";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-xl relative min-w-[300px]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()} // prevent modal close on content click
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
                onClick={onClose}
              >
                ✖
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
