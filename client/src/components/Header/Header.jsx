import React from "react";
import cl from "./Header.module.css";
import { Link } from "react-router-dom";
import Navbar from "../UI/Navbar/Navbar";
import SocialsContacts from "./SocialsContacts";
import Contacts from "./Contacts";

const Header = () => {
  return (
    <header className={cl.header}>
      <div className={`${cl.headerInner} container`}>
        <address className={cl.headerContacts}>
          <ul className={cl.headerContactsItems}>
            <li className={cl.headerContactsItem}>
              <Contacts />
            </li>
            <li className={cl.headerContactsItem}>
              <SocialsContacts />
            </li>
          </ul>
        </address>
        <div className={cl.headerWrapper}>
          <Link to="/">
            <div className={cl.headerLogo}>
              <img
                src={`${process.env.REACT_APP_API_URL}/assets/universalstroj logo.jpeg`}
                alt="УНИВЕРСАЛСТРОЙ"
                className={cl.headerLogoImg}
                loading="lazy"
                width="150"
              />
            </div>
          </Link>
          <Navbar className={cl.nav} linkClass={cl.navLink} isIcons={true} />
        </div>
      </div>
    </header>
  );
};

export default Header;
