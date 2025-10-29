import axios from "axios";
// console.log(import.meta.env.SERVER_URL);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${backendUrl}/api/auth`;

export const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const path = window.location.pathname;
        const isPublic = path === "/" || /^\/[^/]+$/.test(path); // matches "/", "/abc", but not "/abc/def"

        if (!isPublic) {
          window.location.href = "/auth";
        }
      } else {
        return Promise.reject(error.response.data.error);
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
