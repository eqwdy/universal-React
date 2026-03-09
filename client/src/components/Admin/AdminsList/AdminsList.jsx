import React from "react";
import cl from "./AdminsList.module.css";
import UserService from "../../../API/UserFetch";
import { usePopupContext } from "../../../context/PopupContext";
import ButtonAdmin from "../../UI/button/OpenModal/ButtonAdmin";
import { usePeoplesContext } from "../../../context/PeoplesContext";
import { useUserContext } from "../../../context/UserContext";

const AdminsSection = () => {
  const { badInfoPopup } = usePopupContext();
  const { admins, handleAdminsRefresh } = usePeoplesContext();
  const { isOwner } = useUserContext();

  return isOwner ? (
    <article className={cl.asd}>
      {admins?.length > 0 ? (
        <>
          <h2 className={cl.adminsTitle}>Список администраторов</h2>
          <ul className={cl.adminsList}>
            {admins?.map((admin) => (
              <li className={cl.adminsItem} data-id={admin.id} key={admin.id}>
                <div className={cl.admin}>
                  <div className={cl.adminInfo}>
                    <span className={cl.adminName}>{admin.name}</span>
                    <span className={cl.adminTel}>{admin.tel}</span>
                  </div>
                  <button
                    className={cl.adminButton}
                    type="button"
                    aria-label="Удалить админа"
                    onClick={async () => {
                      try {
                        await UserService.deleteADMIN(admin.id);
                        await handleAdminsRefresh();
                      } catch (e) {
                        console.error(e);
                        badInfoPopup("Ошибка");
                      }
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL_ICONS}/remove.svg`}
                      alt=""
                      loading="lazy"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>Нет администраторов</h2>
      )}
      <ButtonAdmin>Добавить администратора</ButtonAdmin>
    </article>
  ) : null;
};

export default AdminsSection;
