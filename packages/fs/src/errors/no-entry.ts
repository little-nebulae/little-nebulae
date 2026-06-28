import type { BaseError } from "@little-nebulae/exception";

export interface NoEntryError extends BaseError<"NO_ENTRY_ERROR"> {
  retryable: false;
  cause: ErrnoException;
  path: string;
}

export function createNoEntryError({
  message,
  cause,
  path,
}: Pick<NoEntryError, "message" | "cause" | "path">): NoEntryError {
  return {
    code: "NO_ENTRY_ERROR",
    message,
    retryable: false,
    cause,
    path,
  };
}
