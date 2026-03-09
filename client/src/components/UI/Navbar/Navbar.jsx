import React from "react";
import { Link } from "react-router-dom";
import cl from "./Navbar.module.css";
import LinkUnderlineTransition from "../link/LinkUnderlineTransition";
import { useUserContext } from "../../../context/UserContext";
import { useBasket } from "../../../hooks/useBasket";

const Navbar = ({ className, linkClass, isIcons = false }) => {
  const { isAuth, isAdmin } = useUserContext();
  const [basketItems] = useBasket();

  return (
    <nav className={className}>
      <LinkUnderlineTransition to="/" className={linkClass}>
        Главная
      </LinkUnderlineTransition>
      <LinkUnderlineTransition to="/gallery" className={linkClass}>
        Галлерея
      </LinkUnderlineTransition>
      <LinkUnderlineTransition to="/catalog" className={linkClass}>
        Товары
      </LinkUnderlineTransition>
      <LinkUnderlineTransition to="/contacts" className={linkClass}>
        Контакты
      </LinkUnderlineTransition>
      {isIcons ? (
        <>
          <Link to="/basket">
            <button
              type="button"
              className={cl.svgButton}
              aria-label="Открыть корзину"
            >
              <img
                src={`${process.env.REACT_APP_API_URL_ICONS}/basket.svg`}
                alt=""
                loading="lazy"
              />
              {basketItems?.length > 0 ? (
                <span className={cl.svgButtonNotify}>{basketItems.length}</span>
              ) : null}
            </button>
          </Link>

          {isAuth ? (
            <Link to="/profile">
              <button
                type="button"
                className={cl.svgButton}
                aria-label="Открыть страницу профиля"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_ICONS}/auth.svg`}
                  alt=""
                  loading="lazy"
                />
              </button>
            </Link>
          ) : (
            <Link to="/register">
              <button
                type="button"
                className={cl.svgButton}
                aria-label="Открыть страницу авторизации"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_ICONS}/auth.svg`}
                  alt=""
                  loading="lazy"
                />
              </button>
            </Link>
          )}

          {isAdmin ? (
            <Link to="/admin-panel">
              <button
                type="button"
                className={cl.svgButton}
                aria-label="Открыть корзину"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_ICONS}/pencil.svg`}
                  alt=""
                  loading="lazy"
                />
              </button>
            </Link>
          ) : null}
        </>
      ) : (
        <>
          <LinkUnderlineTransition to="/basket" className={linkClass}>
            Корзина
          </LinkUnderlineTransition>

          {isAuth ? (
            <LinkUnderlineTransition to="/profile" className={linkClass}>
              Профиль
            </LinkUnderlineTransition>
          ) : (
            <LinkUnderlineTransition to="/register" className={linkClass}>
              Авторизация
            </LinkUnderlineTransition>
          )}

          {isAdmin ? (
            <LinkUnderlineTransition to="/admin-panel" className={linkClass}>
              Админ-панель
            </LinkUnderlineTransition>
          ) : null}
        </>
      )}
    </nav>
  );
};

export default Navbar;
