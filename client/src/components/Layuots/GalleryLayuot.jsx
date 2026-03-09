import React, { useEffect } from "react";
import cl from "../../styles/Gallery.module.css";
import WorksImagesList from "../WorksImagesList/WorksImagesList";

const GalleryLayout = () => {
  return (
    <section>
      <div className="container">
        <h1 className={`${cl.galleryTitle} titleBig`}>Наши работы</h1>
        <WorksImagesList />
      </div>
    </section>
  );
};

export default GalleryLayout;
