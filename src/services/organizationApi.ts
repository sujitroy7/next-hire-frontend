import { ApiResponse } from "@/types/api";
import { OrganizationProfile } from "@/types/organization";
import { AxiosInstance } from "axios";

export async function getOrganizationProfileById(
  axios: AxiosInstance,
  userId: string,
) {
  return axios.get<ApiResponse<OrganizationProfile>>(
    `/organization-profile/${userId}`,
  );
}

export async function createOrganizationProfile(
  axios: AxiosInstance,
  data: Omit<
    OrganizationProfile,
    "id" | "createdAt" | "updatedAt" | "isVerified" | "isActive"
  >,
) {
  return axios.post<ApiResponse<OrganizationProfile>>(
    `/organization-profile`,
    data,
  );
}

export async function updateOrganizationProfile(
  axios: AxiosInstance,
  {
    userId,
    ...data
  }: Omit<
    OrganizationProfile,
    "id" | "createdAt" | "updatedAt" | "isVerified" | "isActive"
  >,
) {
  return axios.patch<ApiResponse<OrganizationProfile>>(
    `/organization-profile/${userId}`,
    data,
  );
}
