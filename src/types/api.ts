export type SuccessResponse<T> = {
  status: "success";
  data: T;
};

export type FailedResponse = {
  status: "error";
  message: string;
};

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;
