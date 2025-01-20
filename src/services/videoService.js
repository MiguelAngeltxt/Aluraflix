import axios from 'axios'

const api = axios.create({
  baseURL: 'https://67852c161ec630ca33a78e42.mockapi.io'
})

// Función para obtener todos los videos
export async function getVideos() {
  const response = await api.get('/video')
  return response.data
}

// Función para crear un video nuevo
export async function createVideo(data) {
  const response = await api.post('/video', data)
  return response.data
}

// Función para eliminar un video por ID
export async function removeVideo(id) {
  const response = await api.delete(`/video/${id}`)
  return response.data
}

// Función para actualizar un video
export async function updateVideo(id, changes) {
  const response = await api.put(`/video/${id}`, changes)
  return response.data
}

export default api
