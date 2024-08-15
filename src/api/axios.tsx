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

instance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      document.cookie = cookie.serialize("userToken", "some.token", {
        expires: new Date(Date.now() - 1000),
      });
      window.location.replace("/sign-in");
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      document.cookie = cookie.serialize("userToken", "some.token", {
        expires: new Date(Date.now() - 1000),
      });
      window.location.replace("/sign-in");
      return Promise.reject(error.response?.data?.message || "Unauthorized");
    }

    return Promise.reject(error);
  },
);
