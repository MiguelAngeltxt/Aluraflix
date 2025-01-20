import React, { useState } from "react";
import styles from "./ModalEditVideo.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";

export default function ModalEditVideo({ video, onClose }) {
  const { editVideo } = useVideoData();
  const [form, setForm] = useState({
    titulo: video.titulo || "",
    categoria: video.categoria || "",
    img: video.img || "",
    url: video.url || "",
    descripcion: video.descripcion || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    editVideo(video.id, form);
    onClose();
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <h2>Editar Card:</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título:</label>
          <input
            name="titulo"
            placeholder="Pon el Título del video"
            value={form.titulo}
            onChange={handleChange}
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Categoría</option>
            <option value="FRONT END">FRONT END</option>
            <option value="BACK END">BACK END</option>
            <option value="INNOVACION Y GESTION">INNOVACIÓN Y GESTIÓN</option>
            <option value="OTROS">OTROS</option>
          </select>
          <label htmlFor="img">Imagen URL:</label>
          <input
            name="img"
            placeholder="Pon la URL de la imagen"
            value={form.img}
            onChange={handleChange}
            required
          />
          <label htmlFor="url">URL del video:</label>
          <input
            name="url"
            placeholder="ingrese el enlace del video"
            value={form.url}
            onChange={handleChange}
            required
          />
          <label htmlFor="descripcion">De qué se trata este video</label>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
          <div className={styles.btnRow}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
