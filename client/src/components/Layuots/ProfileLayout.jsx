import React from "react";
import cl from "../../styles/ProfilePage.module.css";
import { useUserContext } from "../../context/UserContext";
import Button from "../UI/button/Button";
import UserRequests from "../UserRequests/UserRequests";

const ProfileLayout = () => {
  const { user, isAuth, logoutHandler } = useUserContext();

  if (!user) return null;
  if (!isAuth) return null;

  return (
    <div className="container">
      <div className={cl.userInfo}>
        Имя: {user.name}
        <br />
        Телефон: {user.tel}
        <br />
        Роль: {user.role}
      </div>
      <Button onClick={logoutHandler}>Выйти из аккаунта</Button>
      <div className={cl.userRequests} style={{ marginTop: "20px" }}>
        <h2 className={`${cl.userRequestsTitle} titleMedium`}>Ваши заявки</h2>
        <UserRequests />
      </div>
    </div>
  );
};

export default ProfileLayout;
