import React from "react";
import style from "./Banner.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";

export default function Banner() {
  const { videosByCat } = useVideoData();

  // Tomar primer video de la primer categoría con algo adentro
  const allCats = Object.keys(videosByCat);
  let firstVid = null;
  for (let cat of allCats) {
    if (videosByCat[cat].length > 0) {
      firstVid = videosByCat[cat][0];
      break;
    }
  }

  if (!firstVid) {
    return <div className={style.bannerBox}>No hay videos</div>;
  }

  return (
    <section
      className={style.bannerBox}
      style={{
        backgroundImage: `url(${firstVid.img})`,
      }}
    >
      <div className={style.overlay} />
      <div className={style.content}>
        <h1>{firstVid.categoria}</h1>
        <p>{firstVid.descripcion?.slice(0, 100)}...</p>
      </div>
    </section>
  );
}
