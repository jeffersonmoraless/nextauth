import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Tipando o parâmetro explicitamente
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    // Tipando o erro explicitamente
    throw error;
  }
);
