import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"];
const REFRESH_TOKEN_API_URL = `${BASE_URL}/auth/refresh-token`;

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        REFRESH_TOKEN_API_URL,
        {},
        {
          withCredentials: true,
          withXSRFToken: true,
          xsrfHeaderName: "x-csrf-token",
          xsrfCookieName: "csrf-token",
        },
      );
      return response.data.data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response.data?.message || "Refresh failed");
    }
  },
);

const LOGIN_API_URL = `${BASE_URL}/auth/login`;

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(LOGIN_API_URL, credentials);
      return response.data.data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response.data?.message || "Login failed");
    }
  },
);
