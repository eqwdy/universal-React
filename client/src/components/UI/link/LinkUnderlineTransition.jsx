import React from "react";
import cl from "./LinkUnderlineTransition.module.css";
import { Link } from "react-router-dom";

const LinkUnderlineTransition = ({ children, className, to, ...props }) => {
  return (
    <Link
      to={to}
      className={
        className
          ? `${className} ${cl.linkUnderlineTransition}`
          : cl.linkUnderlineTransition
      }
    >
      {children}
    </Link>
  );
};

export default LinkUnderlineTransition;
