import React from "react";
import "./styles/App.css";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { PopupContextProvider } from "./context/PopupContext";
import AppRouter from "./components/AppRouter";

function App() {
  document.documentElement.style.setProperty(
    "--api-url",
    process.env.REACT_APP_API_URL,
  );
  document.documentElement.style.setProperty(
    "--hero-bg-url",
    `url(${process.env.REACT_APP_API_URL}/assets/hero-background.jpeg)`,
  );

  return (
    <UserContextProvider>
      <PopupContextProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ModalProvider>
      </PopupContextProvider>
    </UserContextProvider>
  );
}

export default App;
