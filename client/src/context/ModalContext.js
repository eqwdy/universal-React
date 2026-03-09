import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    request: false,
    admin: false,
    slider: false,
    user: false,
  });

  const [sliderStartPos, setSliderStartPos] = useState(1);

  const openModal = (id) => setModals((prev) => ({ ...prev, [id]: true }));
  const closeModal = (id) => setModals((prev) => ({ ...prev, [id]: false }));

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        sliderStartPos,
        setSliderStartPos,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
