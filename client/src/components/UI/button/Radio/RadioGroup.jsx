import React, { useState } from "react";
import cl from "./Radio.module.css";
import RadioButton from "./RadioButton";

const RadioGroup = ({ params, active, setActive }) => {
  return (
    <div className={cl.RadioGroup} role="radiogroup">
      {params?.map((param, index) => (
        <RadioButton
          key={index}
          param={param}
          setActive={setActive}
          active={active}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
