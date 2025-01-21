import React from "react";
import styles from "./CategoryZone.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";
import VideoCard from "../VideoCard/VideoCard";

export default function CategoryZone() {
  const { videosByCat } = useVideoData();

  // Definir colores para las categorías
  const categoryColors = {
    "front end": "#6bd1ff",
    "back end": "#00c86f",
    "innovación y gestión": "#ffba05",
  };

  const catKeys = Object.keys(videosByCat);

  return (
    <div>
      {catKeys.map((cat) => (
        <div key={cat} className={styles.categoryBlock}>
          {/* Aplicamos el color del título dinámicamente */}
          <h2
            className={styles.catTitle}
            style={{ color: categoryColors[cat] }}
          >
            {cat.toUpperCase()}
          </h2>
          <div className={styles.scroller}>
            {videosByCat[cat].map((video) => (
              <VideoCard key={video.id} data={video} category={cat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
