import React, { useRef, useState } from "react";
import cl from "./RequestForm.module.css";
import Button from "../../button/Button";
import TextArea from "../../textarea/TextArea";
import { IMaskInput } from "react-imask";
import { usePopupContext } from "../../../../context/PopupContext";
import useValidate from "../../../../hooks/useValidate";
import { useBasket } from "../../../../hooks/useBasket";
import { useAxios } from "../../../../hooks/useAxios";
import { getBasket, setBasket } from "../../../../utils/basket";
import { useUserContext } from "../../../../context/UserContext";
import RequestsService from "../../../../API/RequestsService";

const RequestForm = ({ className, closeModal, isOpen }) => {
  const [phone, setPhone] = useState("");
  const [basketItems] = useBasket();
  const { isAuth } = useUserContext();

  const { goodInfoPopup, badInfoPopup } = usePopupContext();

  const validator = useRef(null);
  const formRef = useRef(null);

  const params = [
    {
      key: "#RequestFormName",
      rules: [
        {
          rule: "required",
          errorMessage: "Введите имя!",
        },
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Минимум 2 символа!",
        },
      ],
    },
    {
      key: "#RequestFormTel",
      rules: [
        {
          validator: (value) => {
            const digits = value.replace(/\D/g, "");
            return digits.length === 11;
          },
          errorMessage: "Введите корректный телефон!",
        },
      ],
    },
  ];

  const [fetchMessage] = useAxios(
    async (formData) => {
      await RequestsService.addRequestAnon(formData);
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

  useValidate(validator, formRef, params, successHandler);

  return (
    <form
      className={className ? `${className} ${cl.form}` : cl.form}
      ref={formRef}
    >
      <h2 className={cl.formTitle}>Оставьте заявку через форму</h2>
      {closeModal ? (
        <button
          className={cl.formClose}
          type="button"
          onClick={() => closeModal()}
        ></button>
      ) : null}
      <fieldset className={cl.formItems}>
        <li className={cl.formItem}>
          <input
            type="text"
            name="name"
            id="RequestFormName"
            autoComplete="name"
            className={cl.formInput}
            placeholder=" "
          />
          <label htmlFor="RequestFormName" className={cl.formLabel}>
            Имя*
          </label>
        </li>
        <li className={cl.formItem}>
          <IMaskInput
            mask="+{7}(000)000-00-00"
            type="tel"
            name="tel"
            id="RequestFormTel"
            value={phone}
            onAccept={(value) => setPhone(value)}
            placeholder="+7(___)___-__-__"
            autoComplete="tel"
            className={cl.formInput}
          />
          <label htmlFor="RequestFormTel" className={cl.formLabel}>
            Телефон*
          </label>
        </li>
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
