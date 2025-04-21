import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '~/App.tsx'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import getTheme from './config/theme'
import { GoogleOAuthProvider } from '@react-oauth/google'
import env from './config/env'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={getTheme()}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
