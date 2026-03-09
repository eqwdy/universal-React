import React, { useEffect, useRef } from "react";
import cl from "./InfoPopup.module.css";
import { usePopupContext } from "../../../context/PopupContext";

const InfoPopup = () => {
  const {
    popupText,
    popupSubText,
    popupStatus,
    popupId,
    popupVisible,
    setPopupVisible,
  } = usePopupContext();

  const popupRef = useRef(null);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!popupVisible && !timerRef.current && !popupRef.current) return;

    const popupEl = popupRef.current;
    const timerEl = timerRef.current;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timerEl.classList.remove(cl.good, cl.bad);
    void timerEl.offsetWidth;
    timerEl.classList.add(popupStatus ? cl.good : cl.bad);

    popupEl.classList.remove(cl.shake);
    void popupEl.offsetWidth;
    if (!popupStatus && popupStatus !== null) {
      popupEl.classList.add(cl.shake);
    }

    const animEndHandle = () => popupEl.classList.remove(cl.shake);
    popupEl.addEventListener("animationend", animEndHandle);

    timeoutRef.current = setTimeout(() => {
      setPopupVisible(false);
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        popupEl.removeEventListener("animationend", animEndHandle);
      }
    };
  }, [popupVisible, popupStatus, popupId]);

  return (
    <section className={cl.popup} aria-hidden={!popupVisible} ref={popupRef}>
      <button
        className={`${cl.popupClose} buttonReset`}
        onClick={() => setPopupVisible(false)}
      ></button>
      <div className={cl.popupInner}>
        <span>{popupText}</span>
        <span>{popupSubText}</span>
      </div>
      <div className={cl.popupTimer} ref={timerRef}></div>
    </section>
  );
};

export default InfoPopup;
