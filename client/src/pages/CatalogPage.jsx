import React from "react";
import CatalogItems from "../components/UI/CatalogItems/CatalogItems";
import cl from "../styles/Catalog.module.css";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";

const Catalog = () => {
  return (
    <>
      <MediaHeader />
      <section className={cl.catalog}>
        <div className={`${cl.catalogInner} container`}>
          <h2 className={`${cl.catalogTitle} titleMedium`}>Каталог</h2>
          <CatalogItems />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Catalog;
