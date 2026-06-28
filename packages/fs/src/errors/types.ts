import type { BaseError } from "@little-nebulae/exception";

interface FileSystemError<C extends string> extends BaseError<C> {
  // Some errors may be retried, this is just the default
  retryable: false;
  cause: ErrnoException;
  path: string;
}

export type AccessError = FileSystemError<"ACCESS_ERROR">;
export type NameTooLongError = FileSystemError<"NAME_TOO_LONG_ERROR">;
export type NoEntryError = FileSystemError<"NO_ENTRY_ERROR">;
