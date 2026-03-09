import React from "react";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";
import HomeLayout from "../components/Layuots/HomeLayout";
import ModalRequest from "../components/Modal/ModalRequest";
import InfoPopup from "../components/UI/popup/InfoPopup";

const Home = () => {
  return (
    <>
      <MediaHeader />
      <HomeLayout />
      <Footer />
      <ModalRequest />
      <InfoPopup />
    </>
  );
};

export default Home;
