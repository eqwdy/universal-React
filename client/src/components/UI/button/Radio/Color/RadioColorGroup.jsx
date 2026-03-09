import React, { useState } from "react";
import cl from "./RadioColor.module.css";
import RadioColorButton from "./RadioColorButton";

const RadioColorGroup = ({ params, active, setActive }) => {
  return (
    <div className={cl.RadioColorGroup} role="radiogroup">
      {params?.map((param, index) => (
        <RadioColorButton
          key={index}
          params={param}
          setActive={setActive}
          active={active}
        />
      ))}
    </div>
  );
};

export default RadioColorGroup;
