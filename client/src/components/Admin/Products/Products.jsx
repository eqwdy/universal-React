import React from "react";
import cl from "../../../styles/AdminPage.module.css";
import { usePopupContext } from "../../../context/PopupContext";
import { useAxios } from "../../../hooks/useAxios";
import CardService from "../../../API/cardsFetch";
import Button from "../../UI/button/Button";
import ButtonRed from "../../UI/button/ButtonRed";

const AdminCatalogControl = () => {
  const { goodInfoPopup, badInfoPopup } = usePopupContext();

  const [axiosCreateEx] = useAxios(
    async () => {
      await CardService.createEx();
      goodInfoPopup("Карточки были созданы");
    },
    (e) => {
      console.error(e.response?.data?.message);
      badInfoPopup("Ошибка при создании карточек");
    },
  );

  const [axiosDeleteAll] = useAxios(
    async () => {
      await CardService.deleteAll();
      goodInfoPopup("Карточки были удалены");
    },
    (e) => {
      console.error(e.response?.data?.message);
      badInfoPopup("Ошибка при удалении карточек");
    },
  );

  return (
    <div className={cl.buttonContainer}>
      <Button onClick={axiosCreateEx}>
        Создать экземпляры карточек товара
      </Button>
      <ButtonRed onClick={axiosDeleteAll}>Удалить карточки товара</ButtonRed>
    </div>
  );
};

export default AdminCatalogControl;
