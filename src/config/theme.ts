import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    app: {
      headerHeight: number
    }
  }
  interface ThemeOptions {
    app?: {
      headerHeight?: number
    }
  }
}

const getTheme = (mode = 'light') =>
  createTheme({
    app: {
      headerHeight: 56,
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
