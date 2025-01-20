import React, { useState } from "react";
import styles from "./VideoCard.module.css";
import ModalEditVideo from "../ModalEditVideo/ModalEditVideo";
import ModalViewVideo from "../ModalViewVideo/ModalViewVideo";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";

export default function VideoCard({ data }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { id, titulo, url } = data;

  // Extraemos el ID del video de la URL de YouTube para obtener la miniatura
  const videoId = url.split("/").pop().split("?")[0];

  // URL de la miniatura de alta resolución
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={styles.cardWrap}>
      <div className={styles.iframeContainer} onClick={() => setShowView(true)}>
        {/* Miniatura de alta resolución */}
        <img src={thumbnailUrl} alt={titulo} className={styles.thumbnail} />
        {showView && (
          <iframe
            src={url}
            title={titulo}
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <h4 className={styles.titleVid}>{titulo}</h4>
      <div className={styles.btnGroup}>
        <button onClick={() => setShowEdit(true)}>Editar</button>
        <button onClick={() => setShowDelete(true)}>Borrar</button>
      </div>

      {showEdit && (
        <ModalEditVideo video={data} onClose={() => setShowEdit(false)} />
      )}
      {showView && (
        <ModalViewVideo video={data} onClose={() => setShowView(false)} />
      )}
      {showDelete && (
        <ModalConfirmDelete video={data} onClose={() => setShowDelete(false)} />
      )}
    </div>
  );
}
