import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Creamos el contexto para los datos de video
const VideoDataContext = createContext();

// Custom hook para acceder fácilmente al contexto
export function useVideoData() {
  return useContext(VideoDataContext);
}

// Datos iniciales "por defecto" con 4 videos distribuidos en 3 categorías
const defaultVideos = {
  "front end": [
    {
      id: "1",
      titulo: "Video Frontend 1",
      categoria: "FRONTEND",
      img: "https://img.youtube.com/vi/PztCEdIJITY/maxresdefault.jpg",
      url: "https://www.youtube.com/embed/PztCEdIJITY?si=rAc4jDWXgRGWMH_e", // URL válida
      descripcion: "Descripción del video Frontend 1.",
    },
    {
      id: "2",
      titulo: "Video Frontend 2",
      categoria: "FRONTEND",
      img: "https://via.placeholder.com/320x180?text=Frontend+2",
      url: "https://www.youtube.com/embed/GJfOSoaXk4s?si=SgmJtlEkq-IQ0w8w", // URL válida
      descripcion: "Descripción del video Frontend 2.",
    },
    {
      id: "3",
      titulo: "Video Frontend 2",
      categoria: "FRONTEND",
      img: "https://via.placeholder.com/320x180?text=Frontend+2",
      url: "https://www.youtube.com/embed/rpvrLaBQwgg?si=beHxecj7Cd5pqUro", // URL válida
      descripcion: "Descripción del video Frontend 2.",
    },
  ],
  "back end": [
    {
      id: "4",
      titulo: "Video Backend 1",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/t-iqt1b2qqk?si=CUvCZKZyQVmSr1AB", // URL válida
      descripcion: "Descripción del video Backend 1.",
    },
    {
      id: "5",
      titulo: "Video Backend 2",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/cLLKVd5CNLc?si=pEgURQLwqE4Hn3D0", // URL válida
      descripcion: "Descripción del video Backend 2.",
    },
    {
      id: "6",
      titulo: "Video Backend 1",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/EoPvlE85XAQ?si=Bt1fD-XvGKTWdrzI", // URL válida
      descripcion: "Descripción del video Backend 1.",
    },
  ],
  "innovación y gestión": [
    {
      id: "7",
      titulo: "Video Innovación 1",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/vhwspfvI52k?si=H1OC_vc0PmJcxARR", // URL válida
      descripcion: "Descripción del video Innovación 1.",
    },
    {
      id: "8",
      titulo: "Video Innovación 1",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/YhR7Zp8NUzE?si=lXoUH7PfP_WD5rOf", // URL válida
      descripcion: "Descripción del video Innovación 1.",
    },
    {
      id: "9",
      titulo: "Video Innovación 1",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/6N3OkLCfK-0?si=dE_Psq4vM425AWPO", // URL válida
      descripcion: "Descripción del video Innovación 1.",
    },
  ],
};

export function VideoDataProvider({ children }) {
  // Iniciamos el estado con los videos por defecto
  const [videosByCat, setVideosByCat] = useState(defaultVideos);
  // No se realiza carga desde el API: loading se inicia en false
  const [loading, setLoading] = useState(false);
  // Estado para alertas globales
  const [alertInfo, setAlertInfo] = useState(null);

  // Función para agregar un nuevo video (simulación sin llamar al API)
  async function addVideo(newVid) {
    try {
      const videoToAdd = {
        ...newVid,
        id: new Date().getTime().toString(), // Genera un id único
      };
      // Convertimos la categoría a minúsculas para usarla como key
      const catKey = (newVid.categoria || "otros").toLowerCase();

      setVideosByCat((prev) => {
        const updated = { ...prev };
        if (!updated[catKey]) updated[catKey] = [];
        updated[catKey] = [...updated[catKey], videoToAdd];
        return updated;
      });

      setAlertInfo({ type: "success", message: "Video agregado con éxito" });
    } catch (error) {
      console.error("Error al agregar video:", error);
      setAlertInfo({ type: "error", message: "Error al agregar video" });
    }
  }

  // Función para eliminar un video
  async function deleteVideo(id) {
    try {
      setVideosByCat((prev) => {
        const updated = {};
        Object.keys(prev).forEach((cat) => {
          updated[cat] = prev[cat].filter((video) => video.id !== id);
        });
        return updated;
      });

      setAlertInfo({
        type: "success",
        message: "Video eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar video:", error);
      setAlertInfo({ type: "error", message: "No se pudo eliminar el video" });
    }
  }

  // Función para editar (actualizar) un video, reubicándolo si cambia de categoría
  async function editVideo(id, changes) {
    try {
      setVideosByCat((prev) => {
        const newState = {};
        // Recorremos cada categoría y eliminamos el video a modificar
        Object.keys(prev).forEach((cat) => {
          const updatedCat = prev[cat].filter((video) => video.id !== id);
          newState[cat] = updatedCat;
        });
        // Agregamos el video actualizado a la categoría correspondiente
        const newCat = (changes.categoria || "otros").toLowerCase();
        if (!newState[newCat]) newState[newCat] = [];
        const updatedVideo = { ...changes, id };
        newState[newCat].push(updatedVideo);
        return newState;
      });

      setAlertInfo({
        type: "success",
        message: "Video actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al editar video:", error);
      setAlertInfo({
        type: "error",
        message: "No se pudo actualizar el video",
      });
    }
  }

  const value = {
    videosByCat,
    loading,
    addVideo,
    deleteVideo,
    editVideo,
    alertInfo,
    setAlertInfo,
  };

  return (
    <VideoDataContext.Provider value={value}>
      {children}
    </VideoDataContext.Provider>
  );
}

VideoDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VideoDataProvider;
