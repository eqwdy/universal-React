import React from "react";
import cl from "./Fallback.module.css";
import ButtonArrow from "../UI/button/arrow/ButtonArrow";

const Fallback = () => {
  return (
    <article className={cl.fallback}>
      <div className={cl.fallbackBody}>
        <h2 className={cl.fallbackTitle}>Ваша корзина пока пуста</h2>
        <p className={cl.fallbackDescription}>
          Добавьте товары, чтобы оформить заказ
        </p>
        <ButtonArrow to="/catalog" className={cl.fallbackButton}>
          Перейти в каталог
        </ButtonArrow>
      </div>
      <div className={cl.fallbackImg}>
        <img
          src={`${process.env.REACT_APP_API_URL}/assets/people-with-basket.png`}
          alt=""
        />
      </div>
    </article>
  );
};

export default Fallback;
