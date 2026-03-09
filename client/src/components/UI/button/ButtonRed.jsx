import React from "react";
import cl from "./ButtonRed.module.css";

const ButtonRed = ({ children, className, type = "button", ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={className ? `${className} ${cl.buttonRed}` : cl.buttonRed}
    >
      {children}
    </button>
  );
};

export default ButtonRed;
