import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${backendUrl}/api/products`;

export const productApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

productApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        window.location.href = "/auth";
      } else {
        return Promise.reject(error.response.data.error);
      }
    }
    return Promise.reject(error);
  }
);
