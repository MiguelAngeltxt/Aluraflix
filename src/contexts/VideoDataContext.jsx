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
      titulo: "Cuándo usar let, var y const?",
      categoria: "FRONTEND",
      img: "https://img.youtube.com/vi/PztCEdIJITY/maxresdefault.jpg",
      url: "https://www.youtube.com/embed/PztCEdIJITY?si=rAc4jDWXgRGWMH_e", // URL válida
      descripcion:
        "¿A veces cuando estás programando sientes dificuldades en saber en qué momento utilizar let, var o const para declarar una variable? En este video te sacamos estas dudas, además de explicarte lo que es escopo global y local en JavaScript.",
    },
    {
      id: "2",
      titulo: "¿Qué es JavaScript?",
      categoria: "FRONTEND",
      img: "https://via.placeholder.com/320x180?text=Frontend+2",
      url: "https://www.youtube.com/embed/GJfOSoaXk4s?si=SgmJtlEkq-IQ0w8w", // URL válida
      descripcion:
        "JavaScript: ¿qué es y cómo se hizo este lenguaje que genera muchas discusiones y debates entre la gente del área de desarrollo? Genesys y Gabriela nos hablan exactamente de esto en este Alura Tips.",
    },
    {
      id: "3",
      titulo: "Equipo Front End",
      categoria: "FRONTEND",
      img: "https://via.placeholder.com/320x180?text=Frontend+2",
      url: "https://www.youtube.com/embed/rpvrLaBQwgg?si=beHxecj7Cd5pqUro", // URL válida
      descripcion:
        "¿Estás empezando tus estudios de Programación? ¿Te interesa todo lo que es la creación de Páginas Web Desarrollo de Softwares? ¿O estás pensando en cambiar de carrera y entrar a la maravillosa area de tecnología?. En este video, Jeanmarie Quijada, instructora Front End en Alura Latam te explica qué hace el equipo de Front End.",
    },
  ],
  "back end": [
    {
      id: "4",
      titulo: "Spring Framework. ¿Qué es?",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/t-iqt1b2qqk?si=CUvCZKZyQVmSr1AB", // URL válida
      descripcion:
        "¿Busca un framework  para utilizar en sus proyectos? ¿Conoce Spring Framework? Spring es el framework más usado de Java. Nos ofrece herramientas que nos permiten crear proyectos más avanzados, con mejores prácticas y en menor tiempo. También posee una gran comunidad, lo que nos brinda muchísima documentación y ayuda. ¿Quieres saber más?",
    },
    {
      id: "5",
      titulo: "¿Qué es SQL y NoSQL?",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/cLLKVd5CNLc?si=pEgURQLwqE4Hn3D0", // URL válida
      descripcion:
        "¿Cuáles son las diferencias entre una estructura de datos relacional (SQL) y una no relacional (NoSQL) y cuáles son las principales ventajas de cada una? Álvaro Camacho lo explica en este vídeo.",
    },
    {
      id: "6",
      titulo: "Simplificando tu código en Java: Conoce los enum",
      categoria: "BACK END",
      img: "https://via.placeholder.com/320x180?text=Backend+1",
      url: "https://www.youtube.com/embed/EoPvlE85XAQ?si=Bt1fD-XvGKTWdrzI", // URL válida
      descripcion:
        "¿Escribir muchas variables del tipo constantes en Java te parece un proceso tedioso y que genera muchas líneas de código? En este Alura+ la instructora Génesys Rondón nos enseña a simplificar esta tarea usando un tipo de dato especial llamado enum.",
    },
  ],
  "innovación y gestión": [
    {
      id: "7",
      titulo: "¿Qué son las Soft Skills?",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/vhwspfvI52k?si=H1OC_vc0PmJcxARR", // URL válida
      descripcion:
        "¿Qué son las Softskills y por qué es tan importante desarrollarlas para posicionarse en el mercado laboral? En este video de Alura Tips, Pri Stuani nos habla de las habilidades más buscadas por las empresas en sus profesionales y cómo las Soft Skills te ayudan en el día a día.",
    },
    {
      id: "8",
      titulo: "7 Soft Skills más deseadas por las empresas",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/YhR7Zp8NUzE?si=lXoUH7PfP_WD5rOf", // URL válida
      descripcion:
        "Seguro que ya escuchaste hablar sobre las Soft Skills, pero ¿sabes cuáles son las 7 más buscadas por las empresas? Quédate en este video con nosotros que vamos a explicarte la importancia de estas habilidades y porque son tan requeridas en el mercado laboral.",
    },
    {
      id: "9",
      titulo: "¿Qué son las metodologias ágiles?",
      categoria: "INNOVACION Y GESTION",
      img: "https://via.placeholder.com/320x180?text=Innovacion+1",
      url: "https://www.youtube.com/embed/6N3OkLCfK-0?si=dE_Psq4vM425AWPO", // URL válida
      descripcion:
        "En este video nuestra invitada, Andyara, nos explicará que són las muy conocidas hoy en día metodologias ágiles y nos comentará un poco sobre como aplicarlas y cuáles son los beneficios de utilizarlas en su equipo o empresa.",
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
