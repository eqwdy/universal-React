import React from "react";
import cl from "./ContactPluses.module.css";
import ContactPlus from "../UI/Plus/ContactPlus";
import { ReactComponent as WrenchIcon } from "../../icons/wrench.svg";
import { ReactComponent as GearIcon } from "../../icons/gear.svg";
import { ReactComponent as HammerIcon } from "../../icons/hammer.svg";
import { ReactComponent as MarkIcon } from "../../icons/mark.svg";

const ContactPluses = () => {
  return (
    <div className={cl.plusesItems}>
      <ContactPlus
        title="Опыт"
        description="Более десяти лет успешно производим, продаём и укладываем тротуарную плитку в Крыму"
        SvgIconComponent={WrenchIcon}
      />
      <ContactPlus
        title="Собственное производство"
        description="Полный контроль качества на каждом этапе"
        SvgIconComponent={GearIcon}
      />
      <ContactPlus
        title="Гарантия качества"
        description="Долговечные материалы, проверенные временем"
        SvgIconComponent={MarkIcon}
      />
      <ContactPlus
        title="Укладка и монтаж"
        description="Мы занимаеся не только производством, но и установкой всей нашей
              продукции"
        SvgIconComponent={HammerIcon}
      />
    </div>
  );
};

export default ContactPluses;
