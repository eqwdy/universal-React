import React from "react";
import cl from "./ButtonArrow.module.css";
import { Link } from "react-router-dom";

const ButtonArrow = ({ children, to, className, ...props }) => {
  return (
    <Link
      to={to}
      className={className ? `${className} ${cl.buttonArrow}` : cl.buttonArrow}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonArrow;
