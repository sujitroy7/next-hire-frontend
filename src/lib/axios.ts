import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000",
});

// Request Interceptor: Injects the latest token from redux
api.interceptors.request.use(
  async (config) => {
    const { store } = await import("@/store/store");
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

      const { store } = await import("@/store/store");
      const { refreshAccessToken, logout } =
        await import("@/store/thunks/authThunk");
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
export default api;
