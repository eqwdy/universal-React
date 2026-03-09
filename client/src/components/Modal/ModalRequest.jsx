import React from "react";
import Overlay from "../UI/Overlay/Overlay";
import RequestForm from "../UI/form/RequestForm/RequestForm";
import RequestFormNotAuth from "../UI/form/RequestForm/RequestFormNotAuth.jsx";
import { useModal } from "../../context/ModalContext.js";
import SmartRequestForm from "../UI/form/RequestForm/SmartRequestForm.jsx";

const ModalRequest = () => {
  const { modals, closeModal } = useModal();

  return (
    <Overlay isOpen={modals.request} closeModal={() => closeModal("request")}>
      <SmartRequestForm
        closeModal={() => closeModal("request")}
        isOpen={modals.request}
      />
    </Overlay>
  );
};

export default ModalRequest;
