import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAxios } from "@/lib/axios";

/**
 * Auth thunks - work with HTTP-only cookie authentication
 * Backend sets/clears cookies, thunks only return success/failure for UI state
 */

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      // Backend reads refreshToken from cookie and sets new tokens in cookies
      await clientAxios.post("/auth/refresh-token");
      return true; // Success - tokens are in cookies
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Refresh failed");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Backend sets accessToken and refreshToken in HTTP-only cookies
      await clientAxios.post("/auth/login", credentials);
      return true; // Success - tokens are in cookies
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Backend clears cookies
      await clientAxios.post("/auth/logout");
      return true; // Success
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout Failed");
    }
  },
);
