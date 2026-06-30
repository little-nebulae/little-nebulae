export interface AppError<Code extends string> extends Error {
  code: Code;
}

export interface FlatError<Code extends string> {
  name: string;
  message: string;
  code: Code;
}

export type ValidationErrorCode = "VALIDATION_ERROR";
export interface FlatIssues {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
}
export interface FlatValidationError extends FlatError<ValidationErrorCode> {
  issues: FlatIssues;
}
