import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminsRoutes, authRoutes, publicRoutes } from "../routes/routes";
import { useUserContext } from "../context/UserContext";
import { useModal } from "../context/ModalContext";
import ModalRequest from "./Modal/ModalRequest";
import InfoPopup from "./UI/popup/InfoPopup";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const { user, isAuth, isAdmin, isOwner, isUserLoading, primaryLoading } =
    useUserContext();
  const { modals } = useModal();

  return (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {isAuth && user !== null ? (
          authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        ) : primaryLoading ? (
          <Route path="*" element={<Loader />} />
        ) : isUserLoading ? (
          <Route path="*" element={<Loader />} />
        ) : null}

        {(isAdmin || isOwner) && user !== null ? (
          adminsRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        ) : primaryLoading ? (
          <Route path="*" element={<Loader />} />
        ) : isUserLoading ? (
          <Route path="*" element={<Loader />} />
        ) : null}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <InfoPopup />
      {modals.request && <ModalRequest />}
    </>
  );
};

export default AppRouter;
