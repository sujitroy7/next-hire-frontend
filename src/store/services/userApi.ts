import { User } from "@/types/auth";
import { baseApi } from "./baseApi";
import { SuccessResponse } from "@/types/api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<SuccessResponse<User>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = userApi;
