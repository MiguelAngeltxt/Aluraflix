import React from 'react'
import styles from './ModalViewVideo.module.css'

export default function ModalViewVideo({ video, onClose }) {
  if (!video) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h2>{video.titulo}</h2>
        <div className={styles.iframeBox}>
          <iframe 
            src={video.url}
            title={video.titulo}
            allowFullScreen
          />
        </div>
        <p>{video.descripcion}</p>
      </div>
    </div>
  )
}
