import React from 'react'
import Rutas from './rutas.jsx'
import { VideoDataProvider } from './contexts/VideoDataContext.jsx'
import GlobalStyles from './components/GlobalStyles/GlobalStyles.js'
import { ThemeProvider } from 'styled-components'
import theme from './components/Theme/Theme.js'
import AlertMessages from './components/AlertMessages/AlertMessages'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <VideoDataProvider>
        {/* AlertMessages para mostrar feedback global */}
        <AlertMessages />
        <Rutas />
      </VideoDataProvider>
    </ThemeProvider>
  )
}
