import React, { useRef, useState } from "react";
import cl from "./AdminForm.module.css";
import Button from "../../button/Button";
import UserService from "../../../../API/UserFetch";
import { IMaskInput } from "react-imask";
import { usePopupContext } from "../../../../context/PopupContext";
import useValidate from "../../../../hooks/useValidate";
import { usePeoplesContext } from "../../../../context/PeoplesContext";
import { useAxios } from "../../../../hooks/useAxios";

const AdminForm = ({ closeModal, isOpen, ...props }) => {
  const { goodInfoPopup, badInfoPopup } = usePopupContext();
  const { handleAdminsRefresh } = usePeoplesContext();

  const validator = useRef(null);
  const formRef = useRef(null);

  const [phone, setPhone] = useState("");

  const params = [
    {
      key: "#name",
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
      key: "#tel",
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
    {
      key: "#password",
      rules: [
        {
          rule: "required",
          errorMessage: "Введите пароль!",
        },
        {
          rule: "minLength",
          value: 5,
          errorMessage: "Минимум 5 символов!",
        },
      ],
    },
  ];

  const [axiosRegAdmin] = useAxios(
    async (formData) => {
      await UserService.registerADMIN(formData);
      goodInfoPopup("Добавлен новый администратор!");
      await handleAdminsRefresh();
      if (isOpen) closeModal();
    },
    (e) => {
      console.error(e);
      const message = e.response?.data?.message;
      if (message) {
        switch (message) {
          case "Missing or uncorrect name":
            badInfoPopup("Некорректное имя");
            break;

          case "Missing or uncorrect telephone":
            badInfoPopup("Некорректный телефон");
            break;

          case "Missing or uncorrect password":
            badInfoPopup("Некорректный пароль");
            break;

          case "This telephone is already in use":
            badInfoPopup("Данный номер телефона занят!");
            break;

          default:
            badInfoPopup("Неизвестная ошибка");
        }
      }
    },
  );

  const successHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    await axiosRegAdmin(formData);
  };

  useValidate(validator, formRef, params, successHandler);

  return (
    <form {...props} className={cl.form} ref={formRef}>
      <h2 className={cl.formTitle}>Зарегистрировать нового админа</h2>
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
            id="name"
            autoComplete="name"
            className={cl.formInput}
            placeholder=" "
          />
          <label htmlFor="name" className={cl.formLabel}>
            Имя*
          </label>
        </li>
        <li className={cl.formItem}>
          <IMaskInput
            mask="+{7}(000)000-00-00"
            type="tel"
            name="tel"
            id="tel"
            value={phone}
            onAccept={(value) => setPhone(value)}
            placeholder="+7(___)___-__-__"
            autoComplete="tel"
            className={cl.formInput}
          />
          <label htmlFor="tel" className={cl.formLabel}>
            Телефон*
          </label>
        </li>
        <li className={cl.formItem}>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            className={cl.formInput}
            placeholder=" "
          />
          <label htmlFor="password" className={cl.formLabel}>
            Пароль*
          </label>
        </li>
      </fieldset>
      <Button type="submit" className={cl.formButton}>
        Зарегистрировать
      </Button>
    </form>
  );
};

export default AdminForm;
