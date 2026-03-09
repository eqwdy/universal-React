import React from "react";
import cl from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as MarkerImage } from "../../icons/marker.svg";
import { ReactComponent as PhoneImage } from "../../icons/phone.svg";

const Contacts = () => {
  return (
    <>
      <Link
        to="tel:+79780829838"
        className={`${cl.headerContactsPhone} linkReset`}
      >
        <PhoneImage width="25px" height="25px" />
        <span>+7 978 082-98-38</span>
      </Link>
      <Link
        className={`${cl.headerContactsPhone} linkReset`}
        to="https://yandex.ru/maps/?text=Керченский%20пер.%2C%204%2C%20Феодосия"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MarkerImage width="25px" height="25px" />
        <span>г. Феодосия, Переулок Керченский 4 В</span>
      </Link>
    </>
  );
};

export default Contacts;
