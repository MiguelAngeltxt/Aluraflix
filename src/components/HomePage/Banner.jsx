import React from "react";
import style from "./Banner.module.css";
import { useVideoData } from "../../contexts/VideoDataContext";

export default function Banner() {
  const { videosByCat } = useVideoData();

  // Tomar el primer video de la categoría "frontend"
  const frontEndVideos = videosByCat["front end"];
  const firstFrontendVideo =
    frontEndVideos && frontEndVideos.length > 0 ? frontEndVideos[0] : null;

  if (!firstFrontendVideo) {
    return <div className={style.bannerBox}>No hay videos</div>;
  }

  return (
    <section className={style.bannerBox}>
      <div className={style.overlay} />
      <div className={style.content}>
        <h1>{firstFrontendVideo.titulo.toUpperCase()}</h1>
        <p>{firstFrontendVideo.descripcion}...</p>
      </div>
      <div className={style.videoWrapper}>
        <iframe
          title={firstFrontendVideo.titulo}
          width="560"
          height="315"
          src={firstFrontendVideo.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
