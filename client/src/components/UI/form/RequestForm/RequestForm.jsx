import React from "react";
import cl from "./RequestForm.module.css";
import Button from "../../button/Button";
import TextArea from "../../textarea/TextArea";
import { usePopupContext } from "../../../../context/PopupContext";
import { useBasket } from "../../../../hooks/useBasket";
import { useAxios } from "../../../../hooks/useAxios";
import { getBasket, setBasket } from "../../../../utils/basket";
import { useUserContext } from "../../../../context/UserContext";
import UserRequestsStore from "../../../../store/UserRequestsStore";

const RequestForm = ({ className, closeModal, isOpen }) => {
  const [basketItems] = useBasket();
  const { isAuth } = useUserContext();

  const { goodInfoPopup, badInfoPopup } = usePopupContext();

  const [fetchMessage] = useAxios(
    async (formData) => {
      await UserRequestsStore.addRequest(formData);
      goodInfoPopup("Ваша заяка отправленна!", "Мы вам перезвоним!");
      if (isOpen) closeModal();
      if (basketItems.length > 0) {
        setBasket([]);
      }
    },
    (e) => {
      console.error(e);
      badInfoPopup("Ошибка при отправке!");
    },
  );

  const successHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (basketItems.length > 0) {
      formData.append("products", localStorage.getItem("basket"));
    }

    await fetchMessage(formData);
  };

  if (!isAuth) {
    return (
      <form className={className ? `${className} ${cl.form}` : cl.form}>
        <h2>Вы не авторизированы!</h2>
        {closeModal ? (
          <button
            className={cl.formClose}
            type="button"
            onClick={() => closeModal()}
          ></button>
        ) : null}
      </form>
    );
  }

  return (
    <form
      className={className ? `${className} ${cl.form}` : cl.form}
      onSubmit={successHandler}
    >
      {/* <h2 className={cl.formTitle}>Оставьте заявку через форму</h2> */}
      {closeModal ? (
        <button
          className={cl.formClose}
          type="button"
          onClick={() => closeModal()}
        ></button>
      ) : null}
      <fieldset className={cl.formItems}>
        <li className={cl.formItem}>
          <TextArea
            name="message"
            id="PostFormMessage"
            className={`${cl.formTextarea} ${cl.formInput}`}
            placeholder=" "
          ></TextArea>
          <label htmlFor="PostFormMessage" className={cl.formLabel}>
            Сообщение
          </label>
        </li>
      </fieldset>
      <Button type="submit" className={cl.formButton}>
        Отправить заявку
      </Button>
    </form>
  );
};

export default RequestForm;
