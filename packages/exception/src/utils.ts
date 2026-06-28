import type { UnexpectedError, UnserializableError } from "@/types/errors";

export function createUnexpectedError(action: string): UnexpectedError {
  return {
    code: "UNEXPECTED_ERROR",
    message: `An unexpected error was caught while trying to ${action}.`,
    retryable: false,
  };
}

export function createUnserializableError({
  format,
  cause,
}: Pick<UnserializableError, "format" | "cause">): UnserializableError {
  return {
    code: "UNSERIALIZABLE_ERROR",
    message: `The given value cannot be serialized to ${format}.`,
    retryable: false,
    format,
    cause,
  };
}
