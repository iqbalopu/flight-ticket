// API configuration
const API_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance with base URL
import axios from 'axios'

const api = axios.create({
  baseURL: API_URL
})

export default api
