import React, { useEffect, useState } from "react";
import cl from "./AdminProduct.module.css";
import Button from "../../UI/button/Button";
import Loader from "../../UI/Loader/Loader";
import { usePopupContext } from "../../../context/PopupContext";
import CatalogStore from "../../../store/CatalogStore";
import InputGroup from "./InputGroup/InputGroup";
import InputColorGroup from "./InputColorGroup/InputColorGroup";
import CardService from "../../../API/cardsFetch";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";

const AdminProduct = ({ id }) => {
  const navigate = useNavigate();
  const { goodInfoPopup, badInfoPopup } = usePopupContext();

  const [card, setCard] = useState(null);
  const [editedCard, setEditedCard] = useState({
    img: null,
    title: "",
    price: "",
    description: "",
    types: [],
    sizes: [],
    colors: [],
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const getCardHandler = async () => {
      try {
        const items = await CatalogStore.getItems();
        const cardResp = items.find((item) => Number(item.id) === Number(id));

        if (cardResp) {
          if (typeof cardResp === String) {
            try {
              const cardData = JSON.parse(cardResp);
              console.log(`Parsed data: ${cardData}`);
              setCard(cardData);
              setEditedCard({
                ...cardData,
                img: cardData.img,
              });
            } catch (e) {
              console.error(
                `Error while parsing product data: ${e}, ${e.message}`,
              );
              badInfoPopup("Ошибка", "Загрузки карточки товара");
            }
          } else {
            setCard(cardResp);
            setEditedCard({
              ...cardResp,
              img: cardResp.img,
            });
          }
        }
      } catch (err) {
        badInfoPopup("Ошибка", "Загрузки карточки товара");
      }
    };

    getCardHandler();
  }, [id]);

  useEffect(() => {
    if (editedCard.img instanceof File) {
      const objectUrl = URL.createObjectURL(editedCard.img);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [editedCard.img]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedCard((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const [saveCardHandler, isSaveLoading] = useAxios(
    async () => {
      if (
        editedCard.img === card.img &&
        editedCard.title === card.title &&
        editedCard.price === card.price &&
        editedCard.description === card.description &&
        editedCard.types === card.types &&
        editedCard.sizes === card.sizes &&
        editedCard.colors === card.colors
      ) {
        badInfoPopup("Изменения не были внесенны");
        return;
      }

      const data = new FormData();

      if (editedCard.img instanceof File) {
        data.append("img", editedCard.img);
      }

      data.append("title", editedCard.title);
      data.append("price", editedCard.price);
      data.append("description", editedCard.description);

      data.append("types", JSON.stringify(editedCard.types || []));
      data.append("sizes", JSON.stringify(editedCard.sizes || []));
      data.append("colors", JSON.stringify(editedCard.colors || []));

      await CardService.pathCardById(id, data);

      setCard(editedCard);
      goodInfoPopup("Изменения сохранены");
    },
    (e) => {
      console.error(`Error while updating product data: ${e}, ${e.message}`);
      badInfoPopup("Ошибка", "При сохранении данных товара");
    },
  );

  const updateField = (field, value) => {
    setEditedCard((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const moveToProductPageHandle = (e) => {
    navigate(`/catalog/${id}`);
  };

  if (CatalogStore.error) {
    return <h2 className="titleBig">Ошибка загрузки данных</h2>;
  }

  if (CatalogStore.status === "loading" || !card) {
    return <Loader />;
  }

  return (
    <form
      className={cl.card}
      onSubmit={async (e) => {
        e.preventDefault();
        await saveCardHandler();
      }}
    >
      <div className={cl.cardImg}>
        <img
          src={
            editedCard.img instanceof File
              ? previewUrl
              : `${process.env.REACT_APP_API_URL_PRODUCTS}/${editedCard.img}`
          }
          alt={editedCard.title}
          className={cl.image}
        />

        <label className={cl.overlay}>
          <input
            type="file"
            name="img"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <img
            src={`${process.env.REACT_APP_API_URL_ICONS}/camera-rotate.svg`}
            alt=""
            loading="lazy"
          />
        </label>
      </div>

      <div className={cl.cardBody}>
        <input
          type="text"
          name="title"
          className={`${cl.cardTitle} ${cl.cardInput}`}
          value={editedCard.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        <input
          type="number"
          name="price"
          className={`${cl.cardPrice} ${cl.cardInput}`}
          value={editedCard.price}
          onChange={(e) => updateField("price", e.target.value)}
        />

        <div className={cl.cardRadio}>
          <h2 className={cl.cardRadioTitle}>Типы</h2>
          <InputGroup
            items={editedCard.types}
            setItems={(items) => updateField("types", items)}
          />
        </div>

        <div className={cl.cardRadio}>
          <h2 className={cl.cardRadioTitle}>Размеры</h2>
          <InputGroup
            items={editedCard.sizes}
            setItems={(items) => updateField("sizes", items)}
          />
        </div>

        <div className={cl.cardRadio}>
          <h2 className={cl.cardRadioTitle}>Цвета</h2>
          <InputColorGroup
            items={editedCard.colors}
            setItems={(items) => updateField("colors", items)}
          />
        </div>

        <div className={cl.cardDescriptionWrapper}>
          <h2 className={cl.cardDescriptionTitle}>Описание</h2>
          <input
            type="text"
            name="description"
            className={`${cl.cardDescription} ${cl.cardInput}`}
            value={editedCard.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
      </div>

      <div className={cl.cardBuy}>
        <Button type="submit" disabled={isSaveLoading}>
          {isSaveLoading ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
      <button
        type="button"
        className={cl.closeRedact}
        onClick={moveToProductPageHandle}
      >
        <img
          src={`${process.env.REACT_APP_API_URL_ICONS}/pencil-slash.svg`}
          alt=""
          loading="lazy"
        />
      </button>
    </form>
  );
};

export default AdminProduct;
