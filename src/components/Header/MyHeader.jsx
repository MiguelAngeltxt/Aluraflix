import React, { useState } from "react";
import styles from "./MyHeader.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";
import ModalAddVideo from "../ModalAddVideo/ModalAddVideo";

export default function MyHeader() {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <header className={styles.headerBox}>
      <img
        src="/src/assets/logo.png"
        alt="aluraflix"
        className={styles.logoImg}
      />
      <button className={styles.btnAdd} onClick={() => setOpenAdd(true)}>
        Nuevo Video
      </button>

      {openAdd && <ModalAddVideo onClose={() => setOpenAdd(false)} />}
    </header>
  );
}
