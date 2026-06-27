import type { BaseError } from "@/types/errors";
import type { BaseWarning } from "@/types/warnings";

export interface ErrorException extends BaseError<string> {
  type: "error";
}

export interface WarningException extends BaseWarning<string> {
  type: "warning";
}

export type Exception = ErrorException | WarningException;
