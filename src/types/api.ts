export type SuccessResponse<T> = {
  status: "success";
  data: T;
};

export type FailedResponse = {
  status: "error";
  message: string;
};
