import type { BaseError } from "@little-nebulae/exception";

import type { FS_ERRORS } from "@/lib/exception/constants";

export interface NoEntryError extends BaseError<typeof FS_ERRORS.NO_ENTRY.code> {
  retryable: false;
  cause: ErrnoException;
  path: string;
}

export interface BusyError extends BaseError<typeof FS_ERRORS.BUSY.code> {
  retryable: false;
  cause: ErrnoException;
  path: string;
}
