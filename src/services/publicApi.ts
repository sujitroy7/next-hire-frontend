import { AxiosInstance } from "axios";
import { ApiResponse } from "@/types/api";
import { Job } from "@/types/job";

export async function getJobById(axios: AxiosInstance, id: string) {
  return axios.get<ApiResponse<Job>>(`/jobs/${id}`);
}
