import React, { useRef } from "react";
import cl from "./Plus.module.css";
import { useAccordion } from "../../../hooks/useAccordion";

const Plus = ({ title, description }) => {
  const descRef = useRef();
  const [isOpen, toggle] = useAccordion(descRef, 20, false);

  return (
    <article
      className={cl.plus}
      aria-expanded={isOpen}
      onClick={() => toggle()}
    >
      <div className={cl.plusTitle}>
        <div className={cl.plusTitleWrapper}>
          <div className={cl.plusTitleSvgWrapper}>
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/star.svg`}
              alt=""
              loading="lazy"
            />
          </div>
          <h3 className={cl.plusTitleHeader}>{title}</h3>
        </div>
        <div className={cl.plusStatus}></div>
      </div>
      <p className={cl.plusDescription} ref={descRef}>
        {description}
      </p>
    </article>
  );
};

export default Plus;
