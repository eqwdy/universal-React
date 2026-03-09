import React, { useEffect, useRef } from "react";
import cl from "./Slider.module.css";
import WorksImagesStore from "../../../store/WorksImagesStore";

const Slider = ({
  slides,
  startPos = 1,
  endPos = null,
  isModal = false,
  loadNextWorks = null,
}) => {
  const sliderRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    if (isModal) {
      if (sliderRef.current) {
        const sliderItems = sliderRef.current;
        const targetSlide = sliderItems.children[startPos - 1];
        const itemsRect = sliderItems.getBoundingClientRect();
        const slideRect = targetSlide?.getBoundingClientRect();

        sliderItems.style.scrollBehavior = "auto";
        sliderItems.scrollLeft =
          slideRect?.left - itemsRect.left + sliderItems.scrollLeft;

        requestAnimationFrame(() => {
          sliderItems.style.scrollBehavior = "smooth";
        });
      }
    }
  }, [startPos]);

  async function moveSlide(positive) {
    if (slideRef.current && sliderRef.current) {
      const slide = slideRef.current;
      const slider = sliderRef.current;
      const slideWidth = slide.offsetWidth;

      if (positive) {
        if (
          slider.scrollLeft + slideWidth >=
          slider.scrollWidth - slider.clientWidth
        ) {
          if (loadNextWorks) {
            if (WorksImagesStore.currentPage >= WorksImagesStore.totalPages) {
              slider.scrollLeft = 0;
            } else {
              await loadNextWorks();
              requestAnimationFrame(() => {
                slider.scrollLeft += slideWidth;
              });
            }
          } else {
            slider.scrollLeft = 0; // go to start
          }
        } else {
          slider.scrollLeft += slideWidth;
        }
      } else {
        if (slider.scrollLeft - slideWidth < 0) {
          slider.scrollLeft = slider.scrollWidth; // go to end
        } else {
          slider.scrollLeft -= slideWidth;
        }
      }
    }
  }

  return (
    <div className={isModal ? cl.slider : `${cl.slider} ${cl.sliderRelative}`}>
      <ul className={cl.sliderItems} tabIndex="-1" ref={sliderRef}>
        {endPos
          ? slides?.slice(0, endPos).map((slide) => (
              <li className={cl.sliderItem} ref={slideRef} key={slide.id}>
                <img
                  src={`${process.env.REACT_APP_API_URL_SLIDES}/${slide.img}`}
                  alt="Одна из наших работ"
                />
              </li>
            ))
          : slides?.map((slide) => (
              <li className={cl.sliderItem} ref={slideRef} key={slide.id}>
                <img
                  src={`${process.env.REACT_APP_API_URL_WORKS_IMAGES}/${slide.img}`}
                  alt="Одна из наших работ"
                />
              </li>
            ))}
      </ul>
      {isModal ? (
        <>
          <button
            type="button"
            className={cl.sliderButtonModal}
            aria-label="Предыдущая работа"
            aria-controls="slider"
            onClick={async () => await moveSlide(false)}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-circle-left.svg`}
              alt=""
              loading="lazy"
            />
          </button>
          <button
            type="button"
            className={cl.sliderButtonModal}
            aria-label="Следующая работа"
            aria-controls="slider"
            onClick={async () => await moveSlide(true)}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-circle-right.svg`}
              alt=""
              loading="lazy"
            />
          </button>
        </>
      ) : (
        <div className={cl.sliderButtons}>
          <button
            type="button"
            className={cl.sliderButton}
            aria-label="Предыдущая работа"
            aria-controls="slider"
            onClick={async () => await moveSlide(false)}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-circle-left.svg`}
              alt=""
              loading="lazy"
            />
          </button>
          <button
            type="button"
            className={cl.sliderButton}
            aria-label="Следующая работа"
            aria-controls="slider"
            onClick={async () => await moveSlide(true)}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_ICONS}/arrow-circle-right.svg`}
              alt=""
              loading="lazy"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
