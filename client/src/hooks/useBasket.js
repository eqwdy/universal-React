import { useEffect, useState } from "react";
import { getBasket } from "../utils/basket";

export const useBasket = () => {
  const [basketItems, setBasketItems] = useState(() => getBasket());

  useEffect(() => {
    const handlerUpdateBasket = () => setBasketItems(getBasket());

    window.addEventListener("basketUpdated", handlerUpdateBasket);
    return () =>
      window.removeEventListener("basketUpdated", handlerUpdateBasket);
  }, []);

  return [basketItems];
};
