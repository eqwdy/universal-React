import React from "react";
import cl from "../../../styles/AdminPage.module.css";
import { usePopupContext } from "../../../context/PopupContext";
import { useAxios } from "../../../hooks/useAxios";
import SlidesService from "../../../API/slidesFetch";
import Button from "../../UI/button/Button";
import ButtonRed from "../../UI/button/ButtonRed";

const AdminSlidesControl = () => {
  const { goodInfoPopup, badInfoPopup } = usePopupContext();

  const [axiosCreateExSlides] = useAxios(
    async () => {
      await SlidesService.createEx();
      goodInfoPopup("Слайды были созданы");
    },
    (e) => {
      console.error(e.response?.data?.message);
      badInfoPopup("Ошибка при создании слайдов");
    },
  );
  const [axiosDeleteAllSlides] = useAxios(
    async () => {
      await SlidesService.deleteAll();
      goodInfoPopup("Слайды были удалены");
    },
    (e) => {
      console.error(e.response?.data?.message);
      badInfoPopup("Ошибка при удалении слайдов");
    },
  );

  return (
    <div className={cl.buttonContainer}>
      <Button onClick={axiosCreateExSlides}>Создать экземпляры слайдов</Button>
      <ButtonRed onClick={axiosDeleteAllSlides}>Удалить слайды</ButtonRed>
    </div>
  );
};

export default AdminSlidesControl;
