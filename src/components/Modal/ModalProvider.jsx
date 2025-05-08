import { createContext, useContext, useState, useCallback } from "react";
import Modal from "./Modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const openModal = useCallback((id, modalContent) => {
    setContent((prev) => {
      let arr = [...prev];
      arr.push({ id: id, content: modalContent });
      return arr;
    });
  }, []);

  const closeModal = useCallback(() => {
    setContent((prev) => {
      let arr = [...prev];
      arr.pop();
      return arr;
    });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {content?.map((i) => {
        return (
          <Modal key={i.id} isOpen={!!content} onClose={closeModal}>
            {i.content}
          </Modal>
        );
      })}
    </ModalContext.Provider>
  );
};
