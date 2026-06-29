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
