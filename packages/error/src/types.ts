export interface BaseError<T extends string> {
  code: T;
  message: string;
  retryable: boolean;
}

export interface UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  retryable: false;
}
