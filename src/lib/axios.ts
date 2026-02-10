import { logout } from "@/store/slices/authSlice";
import { store } from "@/store/store";
import { refreshAccessToken } from "@/store/thunks/authThunk";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Request Interceptor: Injects the latest token from redux
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handles accessToken rotation
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await store
          .dispatch(refreshAccessToken())
          .unwrap();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the origianl request with new accessToken
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
  },
);

// createAuthRefreshInterceptor(api, async (failedRequest) => {
//   if (failedRequest.status !== 401) return Promise.reject();

//   return api
//     .post("/auth/refresh-token")
//     .then((res: AxiosResponse) => {
//       if (res.statusText !== "OK") return Promise.reject(res);
//       accessToken = res.data.data.accessToken;
//       return Promise.resolve(res);
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
// });

export default api;
