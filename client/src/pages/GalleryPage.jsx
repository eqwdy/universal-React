import React from "react";
import MediaHeader from "../components/MediaHeader";
import Footer from "../components/Footer/Footer";
import GalleryLayout from "../components/Layuots/GalleryLayuot";
import { useModal } from "../context/ModalContext";
import ModalSlider from "../components/Modal/ModalSlider";

const Gallery = () => {
  const { modals } = useModal();
  return (
    <>
      <MediaHeader />
      <GalleryLayout />
      <Footer />

      {modals.slider && <ModalSlider />}
    </>
  );
};

export default Gallery;
