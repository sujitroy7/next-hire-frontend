import axios from "axios";
import { cookies } from "next/headers";
import { envRequired } from "./envRequired";

/**
 * Server-side axios instance for SSR
 *
 * - Uses absolute URL (server can't use relative paths)
 * - Manually forwards cookies from incoming request
 * - No withCredentials needed (not in browser)
 * - Only works in Server Components
 */
const serverAxios = axios.create({
  baseURL: envRequired("NEXT_PUBLIC_API_URL"),
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

export { serverAxios };
