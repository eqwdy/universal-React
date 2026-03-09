import React, { useRef } from "react";
import cl from "./Radio.module.css";

const RadioButton = ({ param, active, setActive }) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active === param ? true : false}
      onClick={() => {
        setActive(param);
      }}
      className={cl.RadioButton}
    >
      {param}
    </button>
  );
};

export default RadioButton;
