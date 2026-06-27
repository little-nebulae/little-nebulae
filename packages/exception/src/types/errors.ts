export interface BaseError<C extends string> {
  code: C;
  message: string;
  retryable: boolean;
}

export interface UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  retryable: false;
}
