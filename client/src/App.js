import React from "react";
import "./styles/App.css";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { PopupContextProvider } from "./context/PopupContext";
import AppRouter from "./components/AppRouter";
import ModalRequest from "./components/Modal/ModalRequest";
import InfoPopup from "./components/UI/popup/InfoPopup";

function App() {
  document.documentElement.style.setProperty(
    "--hero-bg-url",
    `url(${process.env.REACT_APP_API_URL}/assets/hero-background.jpeg)`,
  );
  document.documentElement.style.setProperty(
    "--arrow-down-icon-url",
    `url(${process.env.REACT_APP_API_URL_ICONS}/arrow-down-black.svg)`,
  );
  document.documentElement.style.setProperty(
    "--arrow-icon-url",
    `url(${process.env.REACT_APP_API_URL_ICONS}/arrow.svg)`,
  );

  return (
    <UserContextProvider>
      <PopupContextProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppRouter />
            <InfoPopup />
            <ModalRequest />
          </BrowserRouter>
        </ModalProvider>
      </PopupContextProvider>
    </UserContextProvider>
  );
}

export default App;
