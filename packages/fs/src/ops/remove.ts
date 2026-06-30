import type { Result } from "@little-nebulae/types";
import type { RmOptions } from "node:fs";

import { UnexpectedError } from "@little-nebulae/exception";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";

import { FsBusyError, FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function remove({
  path,
  ...options
}: { path: string } & RmOptions): Promise<
  Result<null, FsBusyError | FsNoEntryError | UnexpectedError>
> {
  try {
    await rm(path, options);
    return {
      ok: true,
      data: null,
    };
  } catch (error) {
    const absolutePath = resolve(path);
    if (error instanceof Error && "errno" in error) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const exception = error as ErrnoException;
      if (exception.code === FS_ERRNO_CODES.FS_BUSY_ERROR) {
        return {
          ok: false,
          error: new FsBusyError({
            message: `Failed to remove files and directories at ${absolutePath} because they are being used by the system or another process.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
      if (exception.code === FS_ERRNO_CODES.FS_NO_ENTRY_ERROR) {
        return {
          ok: false,
          error: new FsNoEntryError({
            message: `Failed to remove files and directories at ${absolutePath} because they don't exist.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
    }
    return {
      ok: false,
      error: new UnexpectedError({
        action: `remove files and directories at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
