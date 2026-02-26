import { AxiosInstance } from "axios";
import { ApiResponse, PaginationResponse } from "@/types/api";
import { Job } from "@/types/job";

export async function getPublicJobs(
  axios: AxiosInstance,
  params?: Record<string, any>,
) {
  return axios.get<ApiResponse<PaginationResponse<Job[]>>>("/jobs", { params });
}

export async function getJobById(axios: AxiosInstance, id: string) {
  return axios.get<ApiResponse<Job>>(`/jobs/${id}`);
}
