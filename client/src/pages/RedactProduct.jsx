import React from "react";
import cl from "../styles/CardPage.module.css";
import { useParams } from "react-router-dom";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";
import AdminProduct from "../components/CardFullPage/AdminVar/AdminProduct";

const RedactProduct = () => {
  const { id } = useParams();

  return (
    <>
      <MediaHeader />
      <section className={cl.pageCard}>
        <div className={`${cl.pageCard} container`} id="cardContainer">
          <AdminProduct id={id} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RedactProduct;
