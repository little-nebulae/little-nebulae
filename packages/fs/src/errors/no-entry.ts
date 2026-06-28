import type { BaseError } from "@little-nebulae/exception";
import type { OmitKnownKeys } from "@little-nebulae/types";

export interface NoEntryError extends BaseError<"NO_ENTRY_ERROR"> {
  retryable: false;
  cause: ErrnoException;
  path: string;
}

export function createNoEntryError({
  message,
  cause,
  path,
}: OmitKnownKeys<NoEntryError, "code" | "retryable">): NoEntryError {
  return {
    code: "NO_ENTRY_ERROR",
    message,
    retryable: false,
    cause,
    path,
  };
}
