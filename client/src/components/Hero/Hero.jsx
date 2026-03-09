import React from "react";
import cl from "./Hero.module.css";
import ButtonRequest from "../UI/button/OpenModal/ButtonRequest";

const Hero = () => {
  return (
    <section className={cl.hero}>
      <div className={`${cl.heroInner} container`}>
        <h1 className={`${cl.heroTitle} titleBig`}>
          Тротуарная плитка в Феодосии
        </h1>
        <p className={cl.heroDescription}>
          Более 10 лет производим и укладываем плитку, бордюры и изделия для
          благоустройства с гарантией качества
        </p>
        <ButtonRequest className={cl.heroButton}>Оставить заявку</ButtonRequest>
      </div>
    </section>
  );
};

export default Hero;
