import React, { useEffect } from "react";
import cl from "../../styles/Home.module.css";
import Hero from "../Hero/Hero";
import AboutItems from "../About/AboutItems";
import CatalogItems from "../UI/CatalogItems/CatalogItems";
import ButtonArrow from "../UI/button/arrow/ButtonArrow";
import Banner from "../Banner/Banner";
import SliderObserver from "../SliderObserver";

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <section>
        <div className="container">
          <h2 className={`${cl.aboutTitle} titleMedium`}>Почему именно мы?</h2>
          <AboutItems />
        </div>
      </section>
      <section>
        <div className="container">
          <h2 className={`${cl.catalogTitle} titleMedium`}>Каталог</h2>
          <CatalogItems cardsCount={4} />
          <ButtonArrow to="/catalog">Просмотреть все товары</ButtonArrow>
        </div>
      </section>
      <Banner />
      <section>
        <div className="container">
          <h2 className={`${cl.carouselTitle} titleMedium`}>Наши работы</h2>
          <SliderObserver />
          <p className={cl.carouselDescription}>
            Мы гордимся каждой работой — от аккуратной укладки тротуарной плитки
            до масштабных проектов с бордюрами и блоками ФБС. В нашей галерее вы
            увидите примеры качества и надёжности, которые мы обеспечиваем на
            каждом этапе. Современные технологии, опытная команда и внимание к
            деталям — всё это отражено в наших проектах
          </p>
          <ButtonArrow to="/gallery">Больше наших работ</ButtonArrow>
        </div>
      </section>
    </>
  );
};

export default HomeLayout;
