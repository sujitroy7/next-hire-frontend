"use client";

import { useState } from "react";
import { clientAxios } from "../lib/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  login as loginThunkFn,
  refreshAccessToken,
} from "@/store/thunks/authThunk";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  async function login() {
    dispatch(
      loginThunkFn({
        email: "organization1@gmail.com",
        password: "organization",
      }),
    );
  }

  async function getRefreshToken() {
    dispatch(refreshAccessToken());
  }

  async function getUsersList() {
    const response = await clientAxios.get("/users");
    if (response.statusText === "OK") {
      setUsers(response.data.data);
    }
    return response;
  }

  return (
    <div className="min-h-screen font-sans">
      <h1>Auth Testing</h1>
      <br />
      <div>isAuthenticated:{JSON.stringify(isAuthenticated)} </div>
      <div>isLoading:{JSON.stringify(loading)} </div>
      <br />

      <button
        onClick={login}
        className="px-4 py-2 bg-[#0000ff] text-white rounded mr-2"
      >
        Login
      </button>
      <button
        onClick={getUsersList}
        className="px-4 py-2 bg-[#0000ff] text-white rounded mr-2"
      >
        Trigger API
      </button>
      <button
        onClick={getRefreshToken}
        className="px-4 py-2 bg-[#0000ff] text-white rounded mr-2"
      >
        Get New Refresh Token
      </button>

      <br />
      <p>{JSON.stringify(users)}</p>
    </div>
  );
}
