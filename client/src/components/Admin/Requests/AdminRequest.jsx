import React, { useRef } from "react";
import cl from "./AdminRequest.module.css";
import Button from "../../UI/button/Button";
import { useAccordion } from "../../../hooks/useAccordion";
import ButtonRed from "../../UI/button/ButtonRed";
import { ReactComponent as ArrowIcon } from "../../../icons/arrow-down.svg";
import ProductsTable from "../../UI/table/ProductsTable";
import AdminRequestsStore from "../../../store/AdminRequestsStore";
import { usePopupContext } from "../../../context/PopupContext";
import normalizeProducts from "../../../utils/normalizeProducts";

const AdminRequest = ({ request }) => {
  const productsArray = normalizeProducts(request.products);

  const bodyRef = useRef(null);
  const [isOpen, toggle] = useAccordion(bodyRef, 20, false);
  const { badInfoPopup, goodInfoPopup } = usePopupContext();

  const approveRequestHandle = async () => {
    await AdminRequestsStore.changeRequestStatus(request.id, "approved");
    if (AdminRequestsStore.errors.some((error) => error.id === request.id)) {
      return badInfoPopup("Ошибка", "При одобрении заявки");
    }
    goodInfoPopup("Заявка одобрена");
  };

  const rejectRequestHandle = async () => {
    await AdminRequestsStore.changeRequestStatus(request.id, "rejected");
    if (AdminRequestsStore.errors.some((error) => error.id === request.id)) {
      return badInfoPopup("Ошибка", "При отклонении заявки");
    }
    goodInfoPopup("Заявка отколена");
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
        </div>
        <div className={cl.requestTitleGroup}>
          <button
            type="button"
            className={`${cl.requestOpenStatus} buttonReset`}
          >
            <ArrowIcon />
          </button>
        </div>
      </header>
      <div className={cl.requestBody} ref={bodyRef} aria-expanded={isOpen}>
        {request.name || request.tel ? (
          <div className={cl.requestUserInfo}>
            {request.name ? <span>Имя: {request.name}</span> : null}
            {request.tel ? <span>Телефон: {request.tel}</span> : null}
          </div>
        ) : null}
        {productsArray.length > 0 && (
          <div className={cl.requestTableWrapper}>
            <ProductsTable products={productsArray} />
          </div>
        )}
        {request.message && (
          <div className={cl.requestMessage}>Сообщение: {request.message}</div>
        )}
        <div className={cl.requestButtonContainer}>
          <Button type="button" onClick={approveRequestHandle}>
            Одобрить заявку
          </Button>
          <ButtonRed type="button" onClick={rejectRequestHandle}>
            Отклонить заявку
          </ButtonRed>
        </div>
      </div>
    </article>
  );
};

export default AdminRequest;
