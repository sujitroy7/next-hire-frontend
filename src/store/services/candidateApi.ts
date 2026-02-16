import { CandidateExperiance, CandidateProfile } from "@/types/candidate";
import { baseApi } from "./baseApi";

interface CandidateProfileData extends CandidateProfile {
  experiences: CandidateExperiance[];
  education: [];
}

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateProfile: builder.query<CandidateProfileData, string>({
      query: (userId) => ({
        url: `/candidate-profile/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: CandidateProfileData }) =>
        response.data,
      providesTags: ["CandidateProfile"],
    }),
    updateCandidateProfile: builder.mutation<
      CandidateProfile,
      { userId: string; data: Partial<CandidateProfile> }
    >({
      query: ({ userId, data }) => ({
        url: `/candidate-profile/${userId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["CandidateProfile"],
    }),
  }),
});

export const {
  useGetCandidateProfileQuery,
  useUpdateCandidateProfileMutation,
} = candidateApi;
