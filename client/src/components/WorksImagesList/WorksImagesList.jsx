import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import WorksImagesStore from "../../store/WorksImagesStore";
import Loader from "../UI/Loader/Loader";
import cl from "./WorksImagesList.module.css";
import { useModal } from "../../context/ModalContext";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const WorksImagesList = observer(() => {
  const { modals, openModal, setSliderStartPos } = useModal();
  const loaderRef = useRef(null);

  useInfiniteScroll(
    loaderRef,
    WorksImagesStore.status,
    () => WorksImagesStore.initFirstPage(6),
    () => WorksImagesStore.loadNextPage(6),
  );

  if (WorksImagesStore.status === "failed") {
    return <h2 className="titleBig">Ошибка: {WorksImagesStore.error}</h2>;
  }

  return (
    <>
      <ul className={cl.galleryItems}>
        {WorksImagesStore.images?.map((slide, key) => (
          <li className={cl.galleryItem} key={slide.id}>
            <button
              className={cl.galleryImg}
              aria-expanded={modals.slider}
              aria-controls="overlay"
              onClick={() => {
                openModal("slider");
                setSliderStartPos(key + 1);
              }}
            >
              <img
                src={`${process.env.REACT_APP_API_URL_WORKS_IMAGES}/${slide.img}`}
                alt=""
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      <div ref={loaderRef} style={{ height: "40px" }}>
        {WorksImagesStore.status === "loading" && <Loader />}
      </div>
    </>
  );
});

export default WorksImagesList;
