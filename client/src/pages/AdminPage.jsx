import React from "react";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";
import AdminLayout from "../components/Layuots/AdminLayout";
import ModalAdmin from "../components/Modal/ModalAdmin";
import { PeoplesContextProvider } from "../context/PeoplesContext";
import { useModal } from "../context/ModalContext";
import ModalUser from "../components/Modal/ModalUser";

const AdminPage = () => {
  const { modals } = useModal();

  return (
    <PeoplesContextProvider>
      <MediaHeader />
      <AdminLayout />
      <Footer />
      {modals.admin && <ModalAdmin />}
      {modals.user && <ModalUser />}
    </PeoplesContextProvider>
  );
};

export default AdminPage;
