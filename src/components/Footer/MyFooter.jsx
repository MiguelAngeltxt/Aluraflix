import React from "react";
import styles from "./MyFooter.module.css";

export default function MyFooter() {
  return (
    <footer className={styles.footerArea}>
      <p>
        Desarrollado con ♥ por Miguel Angel Falcón. &copy;{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
