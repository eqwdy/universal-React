import React from "react";
import cl from "./UsersList.module.css";
import { usePopupContext } from "../../../context/PopupContext";
import UserService from "../../../API/UserFetch";
import ButtonUser from "../../UI/button/OpenModal/ButtonUser";
import { usePeoplesContext } from "../../../context/PeoplesContext";

const UsersSection = () => {
  const { badInfoPopup } = usePopupContext();
  const { users, handleUsersRefresh } = usePeoplesContext();

  return (
    <article className={cl.asd}>
      {users?.length > 0 ? (
        <>
          <h2 className={cl.usersTitle}>Список пользователей</h2>
          <ul className={cl.usersList}>
            {users?.map((user) => (
              <li className={cl.usersItem} data-id={user.id} key={user.id}>
                <div className={cl.user}>
                  <div className={cl.userInfo}>
                    <span className={cl.userName}>{user.name}</span>
                    <span className={cl.userTel}>{user.tel}</span>
                  </div>
                  <button
                    className={cl.userButton}
                    type="button"
                    aria-label="Удалить админа"
                    onClick={async () => {
                      try {
                        await UserService.deleteUser(user.id);
                        await handleUsersRefresh();
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
        <h2>Нет пользователей</h2>
      )}
      <ButtonUser>Добавить пользователя</ButtonUser>
    </article>
  );
};

export default UsersSection;
