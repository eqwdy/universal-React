import { createContext, useState, useContext } from "react";

const OverlayContext = createContext();

export const OverlayContextProvider = ({ children }) => {
  const [overlayOpenedByEl, setOverlayOpenedByEl] = useState(null);

  return (
    <OverlayContext.Provider
      value={{
        overlayOpenedByEl,
        setOverlayOpenedByEl,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => useContext(OverlayContext);
