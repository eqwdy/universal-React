import React from "react";
import cl from "./Footer.module.css";
import { ReactComponent as PhoneIcon } from "../../icons/phone.svg";
import { ReactComponent as MarkerIcon } from "../../icons/marker.svg";
import { ReactComponent as MailIcon } from "../../icons/mail.svg";
import Navbar from "../UI/Navbar/Navbar";

const Footer = () => {
  return (
    <footer className={cl.footer}>
      <div className={`${cl.Inner} container`}>
        <h2 className="visuallyHidden">Подвал сайта</h2>
        <address className={cl.Contacts}>
          <ul className={cl.ContactsItems}>
            <li className={cl.ContactsItem}>
              <a href="tel:+79780829838" className={cl.ContactsLink}>
                <PhoneIcon />
                <span>+7 978 082-98-38</span>
              </a>
            </li>
            <li className={cl.ContactsItem}>
              <a
                href="mailto:uniwersalstroj2008@mail.ru"
                className={cl.ContactsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailIcon />
                <span>uniwersalstroj2008@mail.ru</span>
              </a>
            </li>
            <li className={cl.ContactsItem}>
              <a
                className={cl.ContactsLink}
                href="https://yandex.ru/maps/?text=Керченский%20пер.%2C%204%2C%20Феодосия"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MarkerIcon />
                <span>г. Феодосия, Переулок Керченский 4 В</span>
              </a>
            </li>
          </ul>
        </address>
        <div className={cl.Body}>
          <Navbar className={cl.Nav} linkClass={cl.NavLink} />
          <div className={cl.Ya}>
            <div className={cl.YaCard}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
