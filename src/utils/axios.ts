import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookies } from "@/lib/cookies";
import { showToast } from "@/helper/toast";

export const BASE_URL = process.env.BASE_BACKEND_URL;

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

async function getToken() {
  const token = await getCookies("token");
  return token?.value;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token!}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

if (typeof window !== "undefined") {
  window.addEventListener("offline", () => {
    showToast("Network is offline", "error");
    return;
  });
}

interface RequestMethods {
  get: <T>(URL: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(
    URL: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T>(URL: string, params?: Record<string, any>, body?: any, config?: AxiosRequestConfig) => Promise<T>;
}

const request: RequestMethods = {
  get: (url, params) => axiosInstance.get(url, { params }).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  delete: (url, params) =>
    axiosInstance.delete(url, { params }).then(responseBody),
  patch: (url, body) => axiosInstance.patch(url, body).then(responseBody),
};

export default request;
