// Avoid repeating the syntax import.meta.env.VITE_
const env = {
  API_URL: import.meta.env.VITE_API_URL,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
}

export default env
