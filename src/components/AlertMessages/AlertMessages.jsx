import React, { useEffect, useState } from 'react'
import { useVideoData } from '../../contexts/VideoDataContext'
import './AlertMessages.css'  // si quieres un css con animaciones

export default function AlertMessages() {
  const { alertInfo, setAlertInfo } = useVideoData()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alertInfo) {
      setVisible(true)
      // Ocultarlo tras 2.5s
      const timer = setTimeout(() => {
        setVisible(false)
        setAlertInfo(null)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [alertInfo, setAlertInfo])

  if (!alertInfo || !visible) return null

  return (
    <div className={`alertContainer ${alertInfo.type}`}>
      <p>{alertInfo.message}</p>
    </div>
  )
}
