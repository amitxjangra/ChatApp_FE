import { createContext, useContext, useState, useCallback } from "react";
import Modal from "./Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [content, setContent] = useState(null);

  const openModal = useCallback((modalContent) => {
    setContent(() => modalContent);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={!!content} onClose={closeModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
