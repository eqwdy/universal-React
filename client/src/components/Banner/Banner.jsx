import React from "react";
import cl from "./Banner.module.css";
import ButtonRequest from "../UI/button/OpenModal/ButtonRequest";

const Banner = () => {
  return (
    <section className={cl.banner}>
      <div className="container">
        <h2 className={`${cl.bannerTitle} titleMedium`}>
          Бесплатные замеры и консультации по укладке плитки в Феодосии!
        </h2>
        <p className={cl.bannerDescription}>
          Наши специалисты совершенно бесплатно приедут к Вам на объект для
          замеров, консультации и составления предварительной сметы.
        </p>
        <ButtonRequest>Оставить заявку</ButtonRequest>
      </div>
    </section>
  );
};

export default Banner;
