export interface AppError<Code extends string> {
  code: Code;
  message: string;
  retryable: boolean;
}

export interface UnexpectedError extends AppError<"UNEXPECTED_ERROR"> {
  retryable: false;
}
