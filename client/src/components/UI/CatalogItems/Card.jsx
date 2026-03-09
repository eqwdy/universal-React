import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cl from "./Catalog.module.css";

const Card = ({ id, title, description, price, imageSrc }) => {
  const descRef = useRef();
  const [maxChars, setMaxChars] = useState(60);

  function getCuttedText(text, maxChars) {
    return text.length > maxChars ? text.slice(0, maxChars) + " …" : text;
  }

  useEffect(() => {
    if (descRef.current) {
      const descEl = descRef.current;
      descEl.dataset.fullText = description.trim();
      descEl.textContent = getCuttedText(descEl.textContent, maxChars);
    }
  }, []);

  return (
    <Link to={`/catalog/${id}`} className="linkReset">
      <article className={cl.card}>
        <div className={cl.cardImg}>
          <img
            src={`${process.env.REACT_APP_API_URL_PRODUCTS}/${imageSrc}`}
            alt={title}
            loading="lazy"
            width="250"
            itemProp="image"
          />
        </div>
        <div className={cl.cardBody}>
          <h3 className={cl.cardTitle} itemProp="name">
            {title}
          </h3>
          <div className={cl.cardPrice} itemProp="price">
            {price}&nbsp;₽
          </div>
          <p
            className={cl.cardDescription}
            data-role="cardDescription"
            itemProp="description"
            ref={descRef}
          >
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Card;
