import { baseApi } from "./baseApi";

interface RecruiterProfile {}

export const recruiterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateRecruiterProfile: builder.mutation<
      RecruiterProfile,
      { userId: string; data: Partial<RecruiterProfile> }
    >({
      query: ({ userId, data }) => ({
        url: `/candidate-profile/${userId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateRecruiterProfileMutation } = recruiterApi;
