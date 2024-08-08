import axios, { AxiosInstance } from 'axios';

const apiBackend = import.meta.env.VITE_BACKEND as string;

const api: AxiosInstance = axios.create({
  baseURL: apiBackend,
  withCredentials: true,
});

export const openApi: AxiosInstance = axios.create({
  baseURL: apiBackend,
});

export default api;
