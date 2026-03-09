import React from "react";
import Plus from "../UI/Plus/Plus";
import cl from "./About.module.css";

const AboutItems = () => {
  return (
    <ul className={cl.aboutItems}>
      <li className={cl.aboutItem}>
        <Plus
          title="Почему именно мы?"
          description="Более десяти лет успешно производим, продаём и укладываем тротуарную плитку в Крыму"
        />
      </li>
      <li className={cl.aboutItem}>
        <Plus
          title="Качество?"
          description="Строгий контроль на каждом этапе, чтобы изделия служили долгие
                годы"
        />
      </li>
      <li className={cl.aboutItem}>
        <Plus
          title="Укладка и монтаж?"
          description="Мы занимаеся не только производством и продажей тротуарной
                плитки, бордюров, клумб и бетонных колец, а так же укладкой
                установкой и монтажом всей нашей продукции."
        />
      </li>
      <li className={cl.aboutItem}>
        <Plus
          title="Современное производство?"
          description="Металлообработка, токарные и сварочные работы, парк станков
                постоянно обновляется"
        />
      </li>
      <li className={cl.aboutItem}>
        <Plus
          title="Широкий ассортимент?"
          description="Бордюры, цветочные клумбы, колодезные кольца, плиты ФБС —
                продукция на любой запрос"
        />
      </li>
      <li className={cl.aboutItem}>
        <Plus
          title="Надёжность?"
          description="Множество довольных клиентов доверяют нам свои проекты, а наша
                продукция служит долгие годы"
        />
      </li>
    </ul>
  );
};

export default AboutItems;
