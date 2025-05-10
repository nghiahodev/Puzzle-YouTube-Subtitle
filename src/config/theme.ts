import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    app: {
      headerHeight: string
    }
  }
  interface ThemeOptions {
    app?: {
      headerHeight?: string
    }
  }
}

const getTheme = (mode = 'light') =>
  createTheme({
    app: {
      headerHeight: '48px',
    },
    // typography: customize text styles, sizes, and weight
    typography: {
      fontFamily: 'Nunito, sans-serif',
    },
    // palette: customize predefined colors
    palette: {},
    // components: customize the styles of pre-build components
    components: {},
  })

export default getTheme
