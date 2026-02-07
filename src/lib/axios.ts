import axios, { AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

let accessToken: string | null = null;

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  xsrfCookieName: "csrf-token",
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Create axios interceptor
createAuthRefreshInterceptor(api, async (failedRequest) => {
  if (failedRequest.status !== 401) return Promise.reject();

  return api.post("/auth/refresh").then((res: AxiosResponse) => {
    if (res.statusText === "ok") return Promise.reject();
    accessToken = res.data.data.accessToken;
    return Promise.resolve();
  });
});

export default api;
