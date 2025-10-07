import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
let accessToken = null;

export const getAccessToken = (token) => {
  accessToken = token;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

export default api;