export type SuccessResponse<T> = {
  status: "success";
  data: T;
};

export type FailedResponse = {
  status: "error";
  message: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationResponse<T> = {
  data: T;
  pagination: Pagination;
};

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;
