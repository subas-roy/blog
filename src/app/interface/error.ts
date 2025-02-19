export type TError = {
  details: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TError;
};
