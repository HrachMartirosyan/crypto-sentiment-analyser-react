import axios from "axios";
import { ENV_CONFIG } from "../configs/env.config.tsx";
import cookie from "cookie";

export const instance = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const cookies = cookie.parse(document.cookie);
  if (cookies.userToken) {
    config.headers.Authorization = `Bearer ${cookies.userToken}`;
  }
  return config;
});
