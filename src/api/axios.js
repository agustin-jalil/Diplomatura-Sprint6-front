import axios from 'axios';

// Asegúrate de tener la variable definida
// For Vite projects, use import.meta.env; for Create React App, process.env is correct.
// If using Vite:
const baseURL = import.meta.env.VITE_API_URL;

// If using Create React App, uncomment the following line instead:
// const baseURL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
