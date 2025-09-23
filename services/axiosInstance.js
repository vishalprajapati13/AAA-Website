import axios from "axios";

const _baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: _baseURL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate max-age=0",
    Pragma: "no-cache",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
