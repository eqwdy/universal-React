import React from "react";
import cl from "./ProductsTable.module.css";
import { setBasket } from "../../../utils/basket";
import { ReactComponent as RemoveIcon } from "../../../icons/remove.svg";

const ProductsTable = ({ products, needToDeleteRows = false }) => {
  const safeItems = Array.isArray(products) ? products : [];

  const removeBasketItem = (item) => {
    console.log(item);
    setBasket(
      safeItems.filter((basketItem) => {
        let flag = true;
        if (
          basketItem.title === item.title &&
          basketItem.price === item.price &&
          basketItem.quantity === item.quantity &&
          basketItem.type === item.type &&
          basketItem.size === item.size &&
          basketItem.color === item.color
        ) {
          flag = false;
        }

        return flag;
      }),
    );
  };

  const totalPrice = safeItems.reduce((sum, product) => sum + product.price, 0);
  const parsedTotalPrice = totalPrice.toLocaleString("ru-RU");

  if (safeItems.length <= 0) return null;

  return needToDeleteRows ? (
    <div className={cl.tableWrapper}>
      <table className={cl.table}>
        <thead className={cl.tableHeader}>
          <tr className={`${cl.tableItems} ${cl.tableItemsDelete}`}>
            <th className={cl.tableTitle} scope="col">
              Продукция
            </th>
            <th className={cl.tableTitle} scope="col">
              Тип
            </th>
            <th className={cl.tableTitle} scope="col">
              Размер
            </th>
            <th className={cl.tableTitle} scope="col">
              Цвет
            </th>
            <th className={cl.tableTitle} scope="col">
              Цена
            </th>
            <th className={cl.tableTitle} scope="col">
              Количество
            </th>
          </tr>
        </thead>
        <tbody className={cl.tableBody}>
          {safeItems?.map((item) => (
            <tr
              className={`${cl.tableItems} ${cl.tableItemsDelete}`}
              key={JSON.stringify(item)}
            >
              <td className={cl.tableItem}>{item.title}</td>
              <td className={cl.tableItem}>{item.type}</td>
              <td className={cl.tableItem}>{item.size}</td>
              <td className={cl.tableItem}>{item.color}</td>
              <td className={cl.tableItem}>{item.price}&nbsp;₽</td>
              <td className={cl.tableItem}>{item.quantity}&nbsp;м²</td>
              <td className={`${cl.tableItem} ${cl.tableItemActions}`}>
                <button
                  className={cl.tableItemDelete}
                  type="button"
                  aria-label="Удалить товар"
                  onClick={() => removeBasketItem(item)}
                >
                  <RemoveIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>Сумма: {parsedTotalPrice}&nbsp;₽</div>
    </div>
  ) : (
    <div className={cl.tableWrapper}>
      <table className={cl.table}>
        <thead className={cl.tableHeader}>
          <tr className={cl.tableItems}>
            <th className={cl.tableTitle} scope="col">
              Продукция
            </th>
            <th className={cl.tableTitle} scope="col">
              Тип
            </th>
            <th className={cl.tableTitle} scope="col">
              Размер
            </th>
            <th className={cl.tableTitle} scope="col">
              Цвет
            </th>
            <th className={cl.tableTitle} scope="col">
              Цена
            </th>
            <th className={cl.tableTitle} scope="col">
              Количество
            </th>
          </tr>
        </thead>
        <tbody className={cl.tableBody}>
          {safeItems?.map((item) => (
            <tr className={cl.tableItems} key={JSON.stringify(item)}>
              <td className={cl.tableItem}>{item.title}</td>
              <td className={cl.tableItem}>{item.type}</td>
              <td className={cl.tableItem}>{item.size}</td>
              <td className={cl.tableItem}>{item.color}</td>
              <td className={cl.tableItem}>{item.price}&nbsp;₽</td>
              <td className={cl.tableItem}>{item.quantity}&nbsp;м²</td>
            </tr>
          ))}
        </tbody>
      </table>

      <span className={cl.totalPrice}>Сумма: {parsedTotalPrice}&nbsp;₽</span>
    </div>
  );
};

export default ProductsTable;
