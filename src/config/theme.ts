import { createTheme } from '@mui/material/styles'
const getTheme = (mode = 'light') =>
  createTheme({
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
