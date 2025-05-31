import axios from "axios";
import { error } from "console";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use(
  async (config) => {
    let token: string = "";

    if (typeof window !== "undefined") {
      token = localStorage.getItem("_token") || "";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network Error:", error);
      return Promise.reject(new Error("Network error occurred"));
    }

    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

function clearToken() {
  localStorage.removeItem("_token");
}
