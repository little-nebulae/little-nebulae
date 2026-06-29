import { BaseError } from "@little-nebulae/exception";

import type { FS_ERRNO_CODES } from "@/lib/exception/constants";

export abstract class FsError<Code extends keyof typeof FS_ERRNO_CODES> extends BaseError<
  Code,
  ErrnoException
> {
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract override readonly code: Code;
  readonly path: string;

  constructor({ message, cause, path }: { message: string; cause: ErrnoException; path: string }) {
    super({ message, cause });
    this.path = path;
  }
}

export class FsBusyError extends FsError<"FS_BUSY_ERROR"> {
  readonly name = "FsBusyError";
  readonly code = "FS_BUSY_ERROR";
}

export class FsExistError extends FsError<"FS_EXIST_ERROR"> {
  readonly name = "FsExistError";
  readonly code = "FS_EXIST_ERROR";
}

export class FsNoEntryError extends FsError<"FS_NO_ENTRY_ERROR"> {
  readonly name = "FsNoEntryError";
  readonly code = "FS_NO_ENTRY_ERROR";
}
