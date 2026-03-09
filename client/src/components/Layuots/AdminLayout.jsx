import React from "react";
import cl from "../../styles/AdminPage.module.css";
import AdminsSection from "../Admin/AdminsList/AdminsList";
import UsersSection from "../Admin/UsersList/UsersList";
import AdminCatalogControl from "../Admin/Products/Products";
import AdminSlidesControl from "../Admin/Slides/Slides";
import ButtonArrow from "../UI/button/arrow/ButtonArrow";

const AdminLayout = () => {
  return (
    <div className="container">
      <h1 className={`${cl.title} titleBig`}>Панель администратора</h1>
      <ul className={cl.body}>
        <li className={cl.bodyItem}>
          <UsersSection />
        </li>
        <li className={cl.bodyItem}>
          <AdminsSection />
        </li>
      </ul>
      <ButtonArrow to={"requests"}>Заявки</ButtonArrow>
      <AdminCatalogControl />
      <AdminSlidesControl />
    </div>
  );
};

export default AdminLayout;
