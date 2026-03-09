import React from "react";
import cl from "../../styles/ContactsPage.module.css";
import ContactPluses from "../ContactPluses/ContactPluses";
import SmartRequestForm from "../UI/form/RequestForm/SmartRequestForm";

const ContactLayout = () => {
  return (
    <section className={cl.contact}>
      <div className="container">
        <h1 className={`${cl.contactTitle} titleBig`}>Свяжитесь с нами</h1>
        <p className={cl.contactDescription}>
          Наша компания — надёжный производитель тротуарной плитки, бордюров и
          бетонных изделий в Феодосии. Свяжитесь с нами, чтобы получить
          консультацию, рассчитать стоимость заказа или оформить доставку по
          Крыму. Мы оперативно ответим на ваш запрос и поможем подобрать
          оптимальные решения для вашего участка или проекта.
        </p>
        <div className={cl.contactWrapper}>
          <SmartRequestForm className={cl.ContactForm} />
          <ContactPluses />
        </div>
      </div>
    </section>
  );
};

export default ContactLayout;
