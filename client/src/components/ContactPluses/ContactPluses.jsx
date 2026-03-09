import React from "react";
import cl from "./ContactPluses.module.css";
import ContactPlus from "../UI/Plus/ContactPlus";

const ContactPluses = () => {
  return (
    <div className={cl.plusesItems}>
      <ContactPlus
        title="Опыт"
        description="Более десяти лет успешно производим, продаём и укладываем тротуарную плитку в Крыму"
        imgEl={
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/wrench.svg`}
            alt=""
            loading="lazy"
          />
        }
      />
      <ContactPlus
        title="Собственное производство"
        description="Полный контроль качества на каждом этапе"
        imgEl={
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/gear.svg`}
            alt=""
            loading="lazy"
          />
        }
      />
      <ContactPlus
        title="Гарантия качества"
        description="Долговечные материалы, проверенные временем"
        imgEl={
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/mark.svg`}
            alt=""
            loading="lazy"
          />
        }
      />
      <ContactPlus
        title="Укладка и монтаж"
        description="Мы занимаеся не только производством, но и установкой всей нашей
              продукции"
        imgEl={
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/hammer.svg`}
            alt=""
            loading="lazy"
          />
        }
      />
    </div>
  );
};

export default ContactPluses;
