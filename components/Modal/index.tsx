import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: JSX.Element;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ children, isModalOpen, setIsModalOpen }) => {
  if (!isModalOpen) return null;

  return createPortal(
    <div className="modal" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className="modal__center">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
