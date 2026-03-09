import { createContext, useContext, useState } from "react";

const popupContext = createContext();

export const PopupContextProvider = ({ children }) => {
  const [popupText, setPopupText] = useState("");
  const [popupSubText, setPopupSubText] = useState("");
  const [popupStatus, setPopupStatus] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const [popupId, setPopupId] = useState(0);

  function resetPopupText() {
    setPopupText("");
    setPopupSubText("");
  }

  function goodInfoPopup(text, subtext = null) {
    resetPopupText();
    setPopupStatus(true);
    setPopupText(text);
    if (subtext) setPopupSubText(subtext);
    setPopupVisible(true);
    setPopupId((prev) => prev + 1);
  }

  function badInfoPopup(text, subtext = null) {
    resetPopupText();
    setPopupStatus(false);
    setPopupText(text);
    if (subtext) setPopupSubText(subtext);
    setPopupVisible(true);
    setPopupId((prev) => prev + 1);
  }

  return (
    <popupContext.Provider
      value={{
        popupText,
        setPopupText,

        popupSubText,
        setPopupSubText,

        popupStatus,
        setPopupStatus,

        popupVisible,
        setPopupVisible,

        popupId,
        setPopupId,

        goodInfoPopup,
        badInfoPopup,
      }}
    >
      {children}
    </popupContext.Provider>
  );
};

export const usePopupContext = () => useContext(popupContext);
