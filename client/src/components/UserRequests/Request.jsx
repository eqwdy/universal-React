import React, { useRef } from "react";
import cl from "./Request.module.css";
import { useAccordion } from "../../hooks/useAccordion";
import UserRequestsStore from "../../store/UserRequestsStore";
import ButtonRed from "../UI/button/ButtonRed";
import ProductsTable from "../UI/table/ProductsTable";
import { usePopupContext } from "../../context/PopupContext";
import normalizeProducts from "../../utils/normalizeProducts";

const Request = ({ request }) => {
  const productsArray = normalizeProducts(request.products);
  const bodyRef = useRef(null);
  const [isOpen, toggle] = useAccordion(bodyRef, 20, false);
  const { badInfoPopup, goodInfoPopup } = usePopupContext();

  const deleteRequestHandle = async () => {
    try {
      await UserRequestsStore.deleteRequest(request.id);
      if (UserRequestsStore.status === "failed") {
        const firstError = UserRequestsStore.error[0];
        switch (firstError.msg) {
          case "You can't delete checked requests":
            badInfoPopup("Ошибка", "Вы не можете удалить просмотренную заявку");
            break;

          default:
            badInfoPopup("Ошибка", "При удалении заявки");
            break;
        }
        return;
      }
      goodInfoPopup("Ваша заяка", "Была удалена успешно!");
    } catch (e) {
      console.log(`Error while deleting request: ${e}, ${e.message}`);
      badInfoPopup("Ошибка");
    }
  };

  if (!request) return null;

  return (
    <article className={cl.request} aria-expanded={isOpen}>
      <header className={cl.requestTitle} onClick={() => toggle()}>
        <div className={cl.requestTitleDate}>
          <span>
            Время создания:{" "}
            {request.createdAt &&
              new Date(request.createdAt).toLocaleString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
          </span>
          {request.updatedAt && request.updatedAt !== request.createdAt ? (
            <span>
              Время изменения:{" "}
              {new Date(request.updatedAt).toLocaleString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          ) : null}
        </div>
        <div className={cl.requestTitleGroup}>
          {request.status === "pending" ? (
            <span style={{ color: "#c0c0c0" }}>На рассмотрении</span>
          ) : request.status === "approved" ? (
            <span style={{ color: "#4caf50" }}>Одобренно</span>
          ) : request.status === "rejected" ? (
            <span style={{ color: "#e74c3c" }}>Отклоненно</span>
          ) : null}
          <button
            type="button"
            className={`${cl.requestOpenStatus} buttonReset`}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-down.svg`}
              alt=""
              loading="lazy"
            />
          </button>
        </div>
      </header>
      <div className={cl.requestBody} ref={bodyRef} aria-expanded={isOpen}>
        {productsArray.length > 0 && (
          <div className={cl.requestTableWrapper}>
            <ProductsTable products={request.products} />
          </div>
        )}
        {request.message && (
          <div className={cl.requestMessage}>Сообщение: {request.message}</div>
        )}
        <ButtonRed
          type="button"
          className={cl.requestDelete}
          onClick={deleteRequestHandle}
        >
          Удалить заявку
        </ButtonRed>
      </div>
    </article>
  );
};

export default Request;
