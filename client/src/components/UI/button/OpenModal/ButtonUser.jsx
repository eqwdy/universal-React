import React from "react";
import { useModal } from "../../../../context/ModalContext";
import Button from "../Button";

const ButtonUser = ({ children, ...props }) => {
  const { modals, openModal } = useModal();

  return (
    <Button
      {...props}
      aria-expanded={modals.user}
      aria-controls="overlay"
      aria-label="Открыть модальное окно с формой"
      type="button"
      onClick={() => openModal("user")}
    >
      {children}
    </Button>
  );
};

export default ButtonUser;
