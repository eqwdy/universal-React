import React from "react";
import Fallback from "../BasketFallback/Fallback";
import cl from "../../styles/BasketPage.module.css";
import { useBasket } from "../../hooks/useBasket";
import ButtonRequest from "../UI/button/OpenModal/ButtonRequest";
import ProductsTable from "../UI/table/ProductsTable";

const BasketLayuot = () => {
  const [basketItems] = useBasket();

  return (
    <section>
      <div className="container">
        <h1 className={`${cl.basketTitle} titleBig`}>Корзина</h1>
        {basketItems.length > 0 ? (
          <>
            <div className={cl.basketTableWrapper}>
              <ProductsTable products={basketItems} needToDeleteRows={true} />
            </div>
            <ButtonRequest>Оставить заявку</ButtonRequest>
          </>
        ) : (
          <Fallback />
        )}
      </div>
    </section>
  );
};

export default BasketLayuot;
