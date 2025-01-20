import React from 'react'
import styles from './ModalConfirmDelete.module.css'
import { useVideoData } from '../../contexts/VideoDataContext'

export default function ModalConfirmDelete({ video, onClose }) {
  const { deleteVideo } = useVideoData()

  function handleYes() {
    deleteVideo(video.id)
    onClose()
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <h3>¿Seguro que deseas eliminar?</h3>
        <p>{video.titulo}</p>
        <div className={styles.btnRow}>
          <button onClick={handleYes}>Sí, borrar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
