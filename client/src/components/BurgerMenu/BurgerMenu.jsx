import React, { use, useEffect, useState } from "react";
import cl from "./BurgerMenu.module.css";
import Navbar from "../UI/Navbar/Navbar";

const BurgerMenu = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {});

  return (
    <>
      <header className={cl.burger} id="burger" aria-hidden={!isBurgerOpen}>
        <button
          className={`${cl.burgerClose} buttonReset`}
          onClick={() => {
            setIsBurgerOpen(false);
          }}
        ></button>
        <div className={cl.burgerLogo}>
          <img
            src={`${process.env.REACT_APP_API_URL}/assets/universalstroj logo.jpeg`}
            alt="УНИВЕРСАЛСТРОЙ"
            width="250"
            loading="lazy"
          />
        </div>
        <Navbar className={cl.burgerNav} linkClass={cl.burgerNavLink} />
        <address className={cl.burgerContacts}>
          <ul className={cl.burgerContactsItems}>
            <li className={cl.burgerContactsItem}>
              <img
                src={`${process.env.REACT_APP_API_URL_ICONS}/phone.svg`}
                alt=""
                loading="lazy"
              />
              <span>
                Пн-Сб
                <br /> 07:30–15:00
              </span>
            </li>
            <li className={cl.burgerContactsItem}>
              <img
                src={`${process.env.REACT_APP_API_URL_ICONS}/auth.svg`}
                alt=""
                loading="lazy"
              />
              <span>+7(978) 082-98-38</span>
            </li>
          </ul>
        </address>
      </header>
      <button
        type="button"
        className={cl.burgerButton}
        aria-expanded={isBurgerOpen}
        aria-controls="burger"
        aria-label="Открыть бургер меню"
        onClick={() => setIsBurgerOpen(true)}
      ></button>
    </>
  );
};

export default BurgerMenu;
