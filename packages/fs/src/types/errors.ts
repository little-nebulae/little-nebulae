import type { BaseError } from "@little-nebulae/exception";

export interface NoEntryError extends BaseError<"NO_ENTRY_ERROR"> {
  retryable: false;
  cause: ErrnoException;
}
