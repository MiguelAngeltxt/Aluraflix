import React, { useState, useEffect } from "react";
import styles from "./ModalAddVideo.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";

export default function ModalAddVideo({ onClose }) {
  const { addVideo } = useVideoData();
  const [form, setForm] = useState({
    titulo: "",
    categoria: "",
    img: "",
    url: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({
    titulo: false,
    categoria: false,
    img: false,
    url: false,
    descripcion: false,
  });

  useEffect(() => {
    // Cuando el URL cambie, generamos la imagen si está vacía
    if (form.url && !form.img) {
      const videoId = extractYouTubeVideoId(form.url);
      if (videoId) {
        setForm((prev) => ({
          ...prev,
          img: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        }));
      }
    }
  }, [form.url]);

  // Función para extraer el ID del video de YouTube
  function extractYouTubeVideoId(url) {
    const match = url.match(
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/?([^"&?\/\s]{11})))|(?:https?:\/\/youtu\.be\/([^"&?\/\s]{11}))/
    );
    return match ? match[1] || match[2] : null;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      titulo: !form.titulo,
      categoria: !form.categoria,
      img: !form.img,
      url: !form.url,
      descripcion: !form.descripcion,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return; // Si hay errores, no se envía el formulario
    }

    addVideo(form);
    onClose();
  }

  function handleClean() {
    setForm({
      titulo: "",
      categoria: "",
      img: "",
      url: "",
      descripcion: "",
    });
    setErrors({
      titulo: false,
      categoria: false,
      img: false,
      url: false,
      descripcion: false,
    });
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <h2>Agregar Nuevo Video</h2>
        <p>Complete el formulario para crear una nueva tarjeta de video</p>
        <form onSubmit={handleSubmit}>
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className={errors.titulo ? styles.inputError : ""}
            required
          />
          {errors.titulo && (
            <span className={styles.errorMessage}>Campo requerido</span>
          )}

          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className={errors.categoria ? styles.inputError : ""}
            required
          >
            <option value="">Categoría</option>
            <option value="FRONT END">FRONT END</option>
            <option value="BACK END">BACK END</option>
            <option value="INNOVACION Y GESTION">INNOVACIÓN Y GESTIÓN</option>
            <option value="OTROS">OTROS</option>
          </select>
          {errors.categoria && (
            <span className={styles.errorMessage}>Campo requerido</span>
          )}

          <input
            name="img"
            placeholder="Imagen URL"
            value={form.img}
            onChange={handleChange}
            className={errors.img ? styles.inputError : ""}
            required
          />
          {errors.img && (
            <span className={styles.errorMessage}>Campo requerido</span>
          )}

          <input
            name="url"
            placeholder="Ingrese el enlace del video"
            value={form.url}
            onChange={handleChange}
            className={errors.url ? styles.inputError : ""}
            required
          />
          {errors.url && (
            <span className={styles.errorMessage}>Campo requerido</span>
          )}

          <textarea
            name="descripcion"
            placeholder="¿De qué se trata este vídeo?"
            value={form.descripcion}
            onChange={handleChange}
            className={errors.descripcion ? styles.inputError : ""}
            required
          />
          {errors.descripcion && (
            <span className={styles.errorMessage}>Campo requerido</span>
          )}

          <div className={styles.btnRow}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleClean}>
              Limpiar
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
