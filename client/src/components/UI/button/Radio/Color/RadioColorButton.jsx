import React from "react";
import cl from "./RadioColor.module.css";

const RadioColorButton = ({ params, active, setActive }) => {
  return (
    <button
      type="button"
      value={params.value}
      role="radio"
      aria-checked={active === params.value ? true : false}
      aria-label={params.text}
      onClick={() => {
        setActive(params.value);
      }}
      style={{ backgroundColor: params.value }}
      className={cl.RadioColorButton}
    ></button>
  );
};

export default RadioColorButton;
