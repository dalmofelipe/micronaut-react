import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

console.log("BACKEND_URL:", BACKEND_URL);

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export default api;
