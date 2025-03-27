import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export const fetchApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000
})
