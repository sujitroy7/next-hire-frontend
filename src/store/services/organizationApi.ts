import { OrganizationProfile } from "@/types/organization";
import { baseApi } from "./baseApi";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrganizationProfile: builder.mutation<
      OrganizationProfile,
      { userId: string; data: Partial<OrganizationProfile> }
    >({
      query: ({ userId, data }) => ({
        url: `/organization-profile/${userId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateOrganizationProfileMutation } = organizationApi;
