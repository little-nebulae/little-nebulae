import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

import { FsBusyError, FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function deleteFile({
  path,
}: {
  path: string;
}): Promise<Result<null, FsBusyError | FsNoEntryError | UnexpectedError>> {
  try {
    await Bun.file(path).delete();
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
            message: `Failed to delete file at ${absolutePath} because it's being used by the system or another process.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
      if (exception.code === FS_ERRNO_CODES.FS_NO_ENTRY_ERROR) {
        return {
          ok: false,
          error: new FsNoEntryError({
            message: `Failed to delete file at ${absolutePath} because it doesn't exist.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
    }
    return {
      ok: false,
      error: new UnexpectedError({
        action: `delete file at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
