import React from "react";
import RequestForm from "./RequestForm";
import RequestFormNotAuth from "./RequestFormNotAuth";
import { useUserContext } from "../../../../context/UserContext";

const SmartRequestForm = ({ closeModal, isOpen }) => {
  const { isAuth, user } = useUserContext();

  return isAuth && user !== null ? (
    <RequestForm closeModal={closeModal} isOpen={isOpen} />
  ) : (
    <RequestFormNotAuth closeModal={closeModal} isOpen={isOpen} />
  );
};

export default SmartRequestForm;
