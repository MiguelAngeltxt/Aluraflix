import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyHome from './components/HomePage/MyHome.jsx'
import NotFound from './pages/NotFound.jsx'

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
