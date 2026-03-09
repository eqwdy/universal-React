import React from "react";
import cl from "./ContactPlus.module.css";

const ContactPlus = ({ title, description, SvgIconComponent }) => {
  return (
    <div className={cl.plus}>
      <div className={cl.plusImg}>
        <SvgIconComponent />
      </div>
      <div className={cl.plusWrapper}>
        <h3 className={cl.plusTitle}>{title}</h3>
        <p className={cl.plusDescription}>{description}</p>
      </div>
    </div>
  );
};

export default ContactPlus;
