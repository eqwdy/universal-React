import React from "react";
import cl from "./InputGroup.module.css";

const InputGroup = ({ items, setItems }) => {
  const safeItems = Array.isArray(items) ? items : [];

  const handleChange = (index, newValue) => {
    const updated = [...safeItems];
    updated[index] = newValue;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...(safeItems || []), ""]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...safeItems];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className={cl.RadioGroup}>
      {Array.isArray(safeItems) &&
        safeItems.length > 0 &&
        safeItems?.map((item, index) => (
          <div className={cl.RadioButtonWrapper} key={index}>
            <input
              type="text"
              value={item}
              className={cl.RadioButton}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <button
              className={cl.RadioButtonRemove}
              onClick={(e) => handleRemoveItem(index)}
              type="button"
            >
              <img
                src={`${process.env.REACT_APP_API_URL_ICONS}/trash.svg`}
                alt=""
                loading="lazy"
              />
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

export default InputGroup;
