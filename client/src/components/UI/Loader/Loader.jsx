import React from "react";
import cl from "./Loader.module.css";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div className={cl.loader}></div>
    </div>
  );
};

export default Loader;
