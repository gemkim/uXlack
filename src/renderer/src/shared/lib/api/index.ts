import axios from 'axios'

const isDev = import.meta.env.VITE_ELECTRON_ENV === 'dev'
export const BASE_URL = isDev ? 'http://localhost:4000' : 'https://uxlack-backend.onrender.com'

export const fetchApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
