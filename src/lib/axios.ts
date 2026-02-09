import axios, { AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

let accessToken: string | null = null;

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  xsrfHeaderName: "x-csrf-token",
  xsrfCookieName: "csrf-token",
  withXSRFToken: true,
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

  return api
    .post("/auth/refresh-token")
    .then((res: AxiosResponse) => {
      if (res.statusText !== "OK") return Promise.reject(res);
      accessToken = res.data.data.accessToken;
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
});

export default api;
