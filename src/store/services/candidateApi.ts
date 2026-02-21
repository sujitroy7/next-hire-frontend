import { CandidateProfile } from "@/types/candidate";
import { baseApi } from "./baseApi";

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCandidateProfile: builder.mutation<
      CandidateProfile,
      { userId: string; data: Partial<CandidateProfile> }
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

export const { useUpdateCandidateProfileMutation } = candidateApi;
