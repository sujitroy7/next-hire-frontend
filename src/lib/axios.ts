import axios from "axios";
import { cookies } from "next/headers";

/**
 * Axios instance configured for cookie-based authentication
 *
 * - Uses Next.js API proxy (/api) for same-origin requests
 * - Enables SameSite=strict cookies (CSRF protection)
 * - Tokens stored in HTTP-only cookies (XSS protection)
 * - Automatic token refresh on 401 errors
 */
const clientAxios = axios.create({
  baseURL: "/api", // Proxy through Next.js API routes
  withCredentials: true, // Send cookies automatically
});

/**
 * Response Interceptor: Automatic token refresh on expiry
 *
 * When a request returns 401 (Unauthorized):
 * 1. Call /auth/refresh to get new tokens (backend sets new cookies)
 * 2. Retry the original request with new tokens
 * 3. If refresh fails, logout and redirect to login
 */
clientAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once to avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint - backend reads refreshToken from cookie
        // and sets new accessToken and refreshToken cookies
        await clientAxios.post("/auth/refresh-token");

        // Retry the original request - new cookies will be sent automatically
        return clientAxios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth state and redirect to login
        const { store } = await import("@/store/store");
        const { logout } = await import("@/store/thunks/authThunk");

        store.dispatch(logout());

        // Redirect to login page (client-side only)
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Server-side axios instance for SSR
 *
 * - Uses absolute URL (server can't use relative paths)
 * - Manually forwards cookies from incoming request
 * - No withCredentials needed (not in browser)
 */
const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();

    // Build cookie header from Next.js cookie store
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    if (cookieHeader) {
      config.headers.Cookie = cookieHeader;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export { clientAxios, serverAxios };
