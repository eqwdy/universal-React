import React from "react";
import { Link } from "react-router-dom";
import cl from "../styles/Auth.module.css";
import AuthForm from "../components/UI/form/AuthForm/AuthForm";
import { ReactComponent as ArrowIcon } from "../icons/Arrow.svg";
import InfoPopup from "../components/UI/popup/InfoPopup";

const Login = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Link
          to="/"
          className={`${cl.backToMainPage} linkReset`}
          aria-label="Вернуться на главную"
        >
          <ArrowIcon />
        </Link>
        <section className={cl.auth}>
          <AuthForm isRegister={false} />
        </section>
      </div>
      <InfoPopup />
    </>
  );
};

export default Login;
