import React, { useEffect } from "react";
import cl from "./Overlay.module.css";

const Overlay = ({ children, isOpen, closeModal }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEsc = (e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      };
      document.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <section
      className={cl.overlay}
      aria-modal="true"
      role="dialog"
      id="overlay"
      aria-hidden={!isOpen}
      onMouseDown={closeModal}
    >
      <div
        className={cl.overlayWrapper}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default Overlay;
