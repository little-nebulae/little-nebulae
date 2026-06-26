import type { UnexpectedError } from "@/types";

export function createUnexpectedError(action: string): UnexpectedError {
  return {
    code: "UNEXPECTED_ERROR",
    message: `An unexpected error was caught while trying to ${action}.`,
    retryable: false,
  };
}
