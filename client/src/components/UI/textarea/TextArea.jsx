import React from "react";
import cl from "./TextArea.module.css";

const TextArea = ({ children, className, ...props }) => {
  return (
    <textarea
      className={className ? `${className} ${cl.TextArea}` : cl.TextArea}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
