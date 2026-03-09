import React from "react";
import { ReactComponent as MailImage } from "../../icons/mail.svg";
import { ReactComponent as VkLogoImage } from "../../icons/vk logo.svg";
import { ReactComponent as WhatsappLogoImage } from "../../icons/whatsapp logo.svg";

const SocialsContacts = () => {
  return (
    <>
      <a
        href="mailto:uniwersalstroj2008@mail.ru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MailImage />
      </a>
      <a
        href="https://vk.com/id516711688"
        target="_blank"
        rel="noopener noreferrer"
      >
        <VkLogoImage color="blue" />
      </a>
      <a
        href="https://wa.me/79780829838"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappLogoImage />
      </a>
    </>
  );
};

export default SocialsContacts;
