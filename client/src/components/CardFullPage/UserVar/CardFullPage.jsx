import React, { useEffect, useRef, useState } from "react";
import cl from "./CardFullPage.module.css";
import Button from "../../UI/button/Button";
import Loader from "../../UI/Loader/Loader";
import { useAccordion } from "../../../hooks/useAccordion";
import Counter from "../../Counter/Counter";
import RadioGroup from "../../UI/button/Radio/RadioGroup";
import RadioColorGroup from "../../UI/button/Radio/Color/RadioColorGroup";
import { usePopupContext } from "../../../context/PopupContext";
import { getBasket, setBasket } from "../../../utils/basket";
import CatalogStore from "../../../store/CatalogStore";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CardFullPage = ({ id }) => {
  const { goodInfoPopup } = usePopupContext();
  const { isAdmin } = useUserContext();
  const navigate = useNavigate();

  const [card, setCard] = useState({});
  const [type, setType] = useState(false);
  const [size, setSize] = useState(false);
  const [color, setColor] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);

  const descRef = useRef(null);
  const [isOpen, toggle] = useAccordion(descRef, 5, false);

  useEffect(() => {
    const GetCardHandler = async () => {
      const items = await CatalogStore.getItems();
      const cardResp = items.find((item) => Number(item.id) === Number(id));
      setCard(cardResp);
      if (cardResp.types) setType(cardResp.types[0]);
      if (cardResp.sizes) setSize(cardResp.sizes[0]);
      if (cardResp.colors) setColor(cardResp.colors[0]?.value);
    };

    GetCardHandler();
  }, []);

  const toCartHandler = (e) => {
    const newData = {
      id: id,
      title: card.title,
      price: parseInt(card.price, 10) * quantityCount,
      quantity: quantityCount,
      type: type || "Обычный",
      size: size || "Обычный",
      color: color || "Обычный",
    };

    const prevData = getBasket();

    let found = false;
    for (let data of prevData) {
      if (
        data.title === newData.title &&
        data.type === newData.type &&
        data.size === newData.size &&
        data.color === newData.color
      ) {
        data.quantity += newData.quantity;
        data.price += newData.price;
        found = true;
        break;
      }
    }
    if (!found) {
      prevData.push(newData);
    }

    setBasket(prevData);
    goodInfoPopup("Успешно", "Добавлено в корзину!");
  };

  const moveToRedactProductPageHandle = () => {
    navigate("edit");
  };

  if (CatalogStore.error) {
    return <h2 className="titleBig">Ошибка</h2>;
  }
  if (CatalogStore.status === "loading") {
    return <Loader />;
  }
  if (!card) {
    return null;
  }

  return (
    <article className={cl.card}>
      <div className={cl.cardImg}>
        <img
          src={`${process.env.REACT_APP_API_URL_PRODUCTS}/${card.img}`}
          alt={card.title}
        />
      </div>
      <div className={cl.cardBody}>
        <h1 className={cl.cardTitle}>{card.title}</h1>
        <div className={cl.cardPrice} data-value={card.price}>
          {card.price}&nbsp;₽
        </div>
        {Array.isArray(card.types) && card.types.length > 0 && (
          <div className={cl.cardRadio}>
            <h2 className={cl.cardRadioTitle}>Типы</h2>
            <RadioGroup active={type} setActive={setType} params={card.types} />
          </div>
        )}
        {Array.isArray(card.sizes) && card.sizes.length > 0 && (
          <div className={cl.cardRadio}>
            <h2 className={cl.cardRadioTitle}>Размеры</h2>
            <RadioGroup active={size} setActive={setSize} params={card.sizes} />
          </div>
        )}
        {Array.isArray(card.colors) && card.colors.length > 0 && (
          <div className={cl.cardRadio}>
            <h2 className={cl.cardRadioTitle}>Размеры</h2>
            <RadioColorGroup
              active={color}
              setActive={setColor}
              params={card.colors}
            />
          </div>
        )}
        <div className={cl.cardDescriptionWrapper}>
          <button
            className={cl.cardDescriptionButton}
            type="button"
            aria-expanded={isOpen}
            onClick={() => toggle()}
          >
            Описание
          </button>
          <p className={cl.cardDescription} ref={descRef} aria-hidden={!isOpen}>
            {card.description}
          </p>
        </div>
      </div>
      <div className={cl.cardBuy}>
        <h2 className={cl.countTitle}>Количество:</h2>
        <Counter count={quantityCount} setCount={setQuantityCount} />
        <Button className={cl.cardBuyButton} onClick={toCartHandler}>
          Добавить в корзину
        </Button>
      </div>
      {isAdmin && (
        <button
          type="button"
          className={cl.closeRedact}
          onClick={moveToRedactProductPageHandle}
        >
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/pencil.svg`}
            alt=""
            loading="lazy"
          />
        </button>
      )}
    </article>
  );
};

export default CardFullPage;
