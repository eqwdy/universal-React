import React from "react";
import cl from "../styles/CardPage.module.css";
import { useParams } from "react-router-dom";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";
import CardFullPage from "../components/CardFullPage/UserVar/CardFullPage";

const CardPage = () => {
  const { id } = useParams();

  return (
    <>
      <MediaHeader />
      <section className={cl.pageCard}>
        <div className={`${cl.pageCard} container`} id="cardContainer">
          <CardFullPage id={id} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CardPage;
