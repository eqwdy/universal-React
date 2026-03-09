import React from "react";
import cl from "./ButtonArrowDown.module.css";
import { Link } from "react-router-dom";

const ButtonArrowDown = ({ children, className, to, ...props }) => {
  return (
    <Link
      to={to}
      className={
        className ? `${className} ${cl.buttonArrowDown}` : cl.buttonArrowDown
      }
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonArrowDown;
