import React, { useEffect } from "react";
import cl from "./Catalog.module.css";
import Card from "./Card";
import CardService from "../../../API/cardsFetch";
import Loader from "../Loader/Loader";
import CatalogStore from "../../../store/CatalogStore.js";
import { observer } from "mobx-react-lite";

const CatalogItems = observer(({ cardsCount = 0 }) => {
  useEffect(() => {
    CatalogStore.getItems();
  }, []);

  if (CatalogStore.error) {
    console.error(CatalogStore.error);
    return <h2 className="titleBig">Ошибка</h2>;
  }
  if (CatalogStore.status === "loading") {
    return <Loader />;
  }

  return (
    <ul className={cl.catalogItems}>
      {cardsCount > 0
        ? CatalogStore.items?.slice(0, cardsCount).map((card) => (
            <li className={cl.catalogItem} key={card.id}>
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                price={card.price}
                imageSrc={card.img}
              />
            </li>
          ))
        : CatalogStore.items?.map((card) => (
            <li className={cl.catalogItem} key={card.id}>
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                price={card.price}
                imageSrc={card.img}
              />
            </li>
          ))}
    </ul>
  );
});

export default CatalogItems;
