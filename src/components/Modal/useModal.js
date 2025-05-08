import { useContext } from "react";
import { ModalContext } from "./ModalProvider";
const useModal = () => useContext(ModalContext);
export default useModal;
