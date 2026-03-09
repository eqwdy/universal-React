import React from "react";
import cl from "./BackToMainPage.module.css";
import { Link } from "react-router-dom";

const BackToMainPage = () => {
  return (
    <Link
      to="/"
      className={`${cl.backToMainPage} linkReset`}
      aria-label="Вернуться на главную"
    >
      <img
        src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-gray.svg`}
        alt=""
        loading="lazy"
      />
    </Link>
  );
};

export default BackToMainPage;
