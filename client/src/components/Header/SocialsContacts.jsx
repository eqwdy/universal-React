import React from "react";

const SocialsContacts = () => {
  return (
    <>
      <a
        href="mailto:uniwersalstroj2008@mail.ru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.REACT_APP_API_URL_ICONS}/mail-black.svg`}
          alt=""
          loading="lazy"
          width="25px"
          height="25px"
        />
      </a>
      <a
        href="https://vk.com/id516711688"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.REACT_APP_API_URL_ICONS}/vk logo.svg`}
          alt=""
          loading="lazy"
          width="25px"
          height="25px"
        />
      </a>
      <a
        href="https://wa.me/79780829838"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.REACT_APP_API_URL_ICONS}/whatsapp logo.svg`}
          alt=""
          loading="lazy"
          width="25px"
          height="25px"
        />
      </a>
    </>
  );
};

export default SocialsContacts;
