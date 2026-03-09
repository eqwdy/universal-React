import React, { useState } from "react";
import cl from "./Counter.module.css";

const Counter = ({ count, setCount }) => {
  const validate = (value) => {
    const num = Number(value);
    return num > 0 ? num : 1;
  };

  return (
    <div className={cl.count}>
      <button
        className={`${cl.countButton} ${cl.countButtonMinus}`}
        type="button"
        aria-label="Уменьшить количество"
        onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
      ></button>

      <input
        type="number"
        name="quantity"
        autoComplete="off"
        min="1"
        maxLength="5"
        className={cl.countInput}
        aria-label="Количество"
        value={count}
        onFocus={() => setCount("")}
        onBlur={(e) => setCount(validate(e.target.value))}
        onChange={(e) => setCount(e.target.value)}
      />

      <button
        className={`${cl.countButton} ${cl.countButtonPlus}`}
        type="button"
        aria-label="Увеличить количество"
        onClick={() => setCount((prev) => Number(prev) + 1 || 1)}
      ></button>
    </div>
  );
};

export default Counter;
