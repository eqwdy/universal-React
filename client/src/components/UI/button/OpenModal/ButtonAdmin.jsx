import React from "react";
import { useModal } from "../../../../context/ModalContext";
import Button from "../Button";

const ButtonAdmin = ({ children, ...props }) => {
  const { modals, openModal } = useModal();

  return (
    <Button
      {...props}
      aria-expanded={modals.admin}
      aria-controls="overlay"
      aria-label="Открыть модальное окно с формой"
      type="button"
      onClick={() => openModal("admin")}
    >
      {children}
    </Button>
  );
};

export default ButtonAdmin;
