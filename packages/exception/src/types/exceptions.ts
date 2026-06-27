import type { AppError } from "@/types/errors";
import type { Warning } from "@/types/warnings";

export interface ErrorException extends AppError<string> {
  type: "error";
}

export interface WarningException extends Warning<string> {
  type: "warning";
}

export type Exception = ErrorException | WarningException;
