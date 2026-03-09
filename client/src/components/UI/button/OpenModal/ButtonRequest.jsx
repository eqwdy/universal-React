import React from "react";
import cl from "./ButtonRequest.module.css";
import { useModal } from "../../../../context/ModalContext";

const ButtonRequest = ({ className, children, ...props }) => {
  const { modals, openModal } = useModal();

  return (
    <button
      {...props}
      aria-expanded={modals.request}
      aria-controls="overlay"
      aria-label="Открыть модальное окно с формой"
      type="button"
      onClick={() => openModal("request")}
      className={
        className ? `${className} ${cl.buttonRequest}` : cl.buttonRequest
      }
    >
      {children}
    </button>
  );
};

export default ButtonRequest;
