import React from "react";
import cl from "./Button.module.css";

const Button = ({ className, children, type = "button", ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={className ? `${className} ${cl.button}` : cl.button}
    >
      {children}
    </button>
  );
};

export default Button;
