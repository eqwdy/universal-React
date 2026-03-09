import React, { useRef, useState } from "react";
import cl from "./AuthForm.module.css";
import Button from "../../button/Button";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../../../API/UserFetch";
import { IMaskInput } from "react-imask";
import { usePopupContext } from "../../../../context/PopupContext";
import { useUserContext } from "../../../../context/UserContext";
import useValidate from "../../../../hooks/useValidate";
import { useAxios } from "../../../../hooks/useAxios";

const AuthForm = ({ isRegister = true, ...props }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const { badInfoPopup } = usePopupContext();
  const { loadUser } = useUserContext();

  const validator = useRef(null);
  const formRef = useRef(null);

  const registerParams = [
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

  const loginParams = [
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

  const params = isRegister ? registerParams : loginParams;

  const [fetchRegister, isRegisterLoading] = useAxios(
    async (formData) => {
      if (isRegisterLoading) {
        console.log("Regiser is loading!");
        return;
      }

      await UserService.register(formData);
      loadUser();
      navigate("/");
    },
    (e) => {
      const errors = e.response?.data?.errors;
      if (errors && errors.length > 0) {
        const firstError = errors[0];

        switch (firstError.path) {
          case "name":
            badInfoPopup("Некорректное имя");
            break;

          case "tel":
            if (firstError.msg === "This telephone is already in use") {
              badInfoPopup("Данный номер телефона занят!");
              break;
            }
            badInfoPopup("Некорректный телефон");
            break;

          case "password":
            badInfoPopup("Некорректный пароль");
            break;

          default:
            badInfoPopup(firstError.msg || "Неизвестная ошибка");
        }
      }
    },
  );

  const [fetchLogin, isLoginLoading] = useAxios(
    async (formData) => {
      if (isLoginLoading) return;

      await UserService.login(formData);
      loadUser();
      navigate("/");
    },
    (e) => {
      const errors = e.response?.data?.errors;
      if (errors && errors.length > 0) {
        const firstError = errors[0];
        switch (firstError.msg) {
          case "User was not found":
            badInfoPopup("Пользователь не найден");
            return;

          case "Uncorrect password":
            badInfoPopup("Некорректный пароль");
            return;

          default:
            badInfoPopup("Неизвестная ошибка");
            return;
        }
      }
    },
  );

  const successHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (isRegister) {
      await fetchRegister(formData);
    } else {
      await fetchLogin(formData);
    }
  };

  useValidate(validator, formRef, params, successHandler);

  return (
    <form
      {...props}
      className={cl.form}
      ref={formRef}
      onSubmit={successHandler}
    >
      {isRegister ? (
        <h2 className={cl.formTitle}>Регистрация</h2>
      ) : (
        <h2 className={cl.formTitle}>Авторизация</h2>
      )}
      <fieldset className={cl.formItems}>
        {isRegister ? (
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
        ) : null}
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

      {isRegister ? (
        <>
          <Button type="submit" className={cl.formButton}>
            Зарегистрироваться
          </Button>
          <div className={cl.formLink}>
            <span>Есть аккаунт?</span>
            <Link
              to="/login"
              aria-label="Перейти в окно авторизации, если имеется аккаунт"
            >
              Авторизироваться
            </Link>
          </div>
        </>
      ) : (
        <>
          <Button type="submit" className={cl.formButton}>
            Авторизироваться
          </Button>
          <div className={cl.formLink}>
            <span>Нет аккаунта?</span>
            <Link to="/register" aria-label="Перейти на окно регистрации">
              Зарегистрироваться
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default AuthForm;
