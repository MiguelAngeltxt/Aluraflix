import React from "react";
import styles from "./CategoryZone.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";
import VideoCard from "../VideoCard/VideoCard";

export default function CategoryZone() {
  const { videosByCat } = useVideoData();

  // Mostrar los datos de las categorías en la consola para depuración
  console.log(videosByCat);

  // Eliminamos el filtro para ver todas las categorías, incluso las vacías
  const catKeys = Object.keys(videosByCat);

  return (
    <div>
      {catKeys.map((cat) => (
        <div key={cat} className={styles.categoryBlock}>
          <h2 className={styles.catTitle}>{cat.toUpperCase()}</h2>
          <div className={styles.scroller}>
            {videosByCat[cat].map((video) => (
              <VideoCard key={video.id} data={video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
