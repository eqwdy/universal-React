import React from "react";
import Overlay from "../UI/Overlay/Overlay";
import { useModal } from "../../context/ModalContext";
import UserForm from "../UI/form/UserForm/UserForm";

const ModalUser = () => {
  const { modals, closeModal } = useModal();
  return (
    <Overlay isOpen={modals.user} closeModal={() => closeModal("user")}>
      <UserForm isOpen={modals.user} closeModal={() => closeModal("user")} />
    </Overlay>
  );
};

export default ModalUser;
