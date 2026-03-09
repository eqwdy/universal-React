import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const MediaHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <BurgerMenu /> : <Header />;
};

export default MediaHeader;
