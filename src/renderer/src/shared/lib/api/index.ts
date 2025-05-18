import axios from 'axios'

export const BASE_URL = 'https://uxlack-backend.onrender.com'

export const fetchApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
