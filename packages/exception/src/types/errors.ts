export interface BaseError<C extends string> {
  code: C;
  message: string;
  retryable: boolean;
  cause?: unknown;
}

export interface UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  retryable: false;
}

export interface UnserializableError extends BaseError<"UNSERIALIZABLE_ERROR"> {
  format: "JSON" | "YAML";
  retryable: false;
}
