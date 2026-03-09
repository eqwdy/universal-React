import React from "react";
import cl from "../styles/Auth.module.css";
import AuthForm from "../components/UI/form/AuthForm/AuthForm";
import InfoPopup from "../components/UI/popup/InfoPopup";
import BackToMainPage from "../components/UI/BackToMainPage/BackToMainPage";

const Register = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <BackToMainPage />
        <section className={cl.auth}>
          <AuthForm />
        </section>
      </div>
      <InfoPopup />
    </>
  );
};

export default Register;
