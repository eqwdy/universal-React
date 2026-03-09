import React from "react";
import Overlay from "../UI/Overlay/Overlay";
import AdminForm from "../UI/form/AdminForm/AdminForm";
import { useModal } from "../../context/ModalContext";

const ModalAdmin = () => {
  const { modals, closeModal } = useModal();
  return (
    <Overlay isOpen={modals.admin} closeModal={() => closeModal("admin")}>
      <AdminForm isOpen={modals.admin} closeModal={() => closeModal("admin")} />
    </Overlay>
  );
};

export default ModalAdmin;
