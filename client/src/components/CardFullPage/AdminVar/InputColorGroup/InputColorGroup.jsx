import React, { useState, useEffect } from "react";
import cl from "./InputColorGroup.module.css";
import { ReactComponent as RemoveIcon } from "../../../../icons/trash.svg";

const InputColorGroup = ({ items, setItems }) => {
  const safeItems = Array.isArray(items) ? items : [];

  const [tempColors, setTempColors] = useState(safeItems);

  useEffect(() => {
    setTempColors(Array.isArray(items) ? items : []);
  }, [items]);

  const handleTempChangeText = (index, newValue) => {
    const updated = [...tempColors];
    updated[index] = { ...updated[index], text: newValue };
    setTempColors(updated);
  };

  const handleTempChangeValue = (index, newValue) => {
    const updated = [...tempColors];
    updated[index] = { ...updated[index], value: newValue };
    setTempColors(updated);
  };

  const applyChange = (index) => {
    const updated = [...safeItems];
    updated[index] = { ...tempColors[index] };
    setItems(updated);
  };

  const handleAddItem = (e) => {
    // const updated = [...safeItems];
    // updated.push({ text: "Чёрный", value: "#000000" });
    // setItems(updated);
    setItems([...(safeItems || []), { text: "Чёрный", value: "#000000" }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...safeItems];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className={cl.RadioColorGroup}>
      {safeItems?.map((item, index) => (
        <div key={`${index}-${item.value}`} className={cl.colorWrapper}>
          <div className={cl.inputWrapper}>
            <input
              value={tempColors[index]?.value || "#000000"}
              aria-label={item.text}
              type="color"
              onChange={(e) => handleTempChangeValue(index, e.target.value)}
              onBlur={() => applyChange(index)}
              className={cl.RadioColorButton}
            />
            <div
              className={cl.inputPreview}
              style={{ backgroundColor: item.value }}
            ></div>
          </div>
          <input
            type="text"
            onChange={(e) => handleTempChangeText(index, e.target.value)}
            onBlur={() => applyChange(index)}
            value={tempColors[index]?.text || ""}
            className={cl.RadioButton}
          />
          <button
            className={cl.RadioButtonRemove}
            onClick={(e) => handleRemoveItem(index)}
            type="button"
          >
            <RemoveIcon />
          </button>
        </div>
      ))}
      <div className={cl.addButtonWrapper}>
        <button
          className={cl.addButton}
          onClick={handleAddItem}
          type="button"
        />
      </div>
    </div>
  );
};

export default InputColorGroup;
