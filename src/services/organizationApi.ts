import { ApiResponse, PaginationParams, PaginationResponse } from "@/types/api";
import { OrganizationProfile } from "@/types/organization";
import { Recruiter } from "@/types/recruiter";
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

export async function getOrgRecruiters(
  axios: AxiosInstance,
  { page, limit }: PaginationParams,
) {
  return axios.get<ApiResponse<PaginationResponse<Recruiter[]>>>(
    `/users/recruiters`,
    { params: { page, limit } },
  );
}
