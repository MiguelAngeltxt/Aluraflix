import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0; 
    box-sizing: border-box;
  }
  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.back};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }
`

export default GlobalStyles
