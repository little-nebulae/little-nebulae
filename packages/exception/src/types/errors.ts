export interface AppError<C extends string> {
  code: C;
  message: string;
  retryable: boolean;
}

export interface UnexpectedError extends AppError<"UNEXPECTED_ERROR"> {
  retryable: false;
}
