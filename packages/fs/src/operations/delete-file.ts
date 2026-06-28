import type { UnexpectedError } from "@little-nebulae/exception";
import type { Result } from "@little-nebulae/types";

import { createUnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

import type { BusyError, NoEntryError } from "@/lib/exception/errors";

import { FS_ERRORS } from "@/lib/exception/constants";

export async function deleteFile(
  path: string,
): Promise<Result<null, BusyError | NoEntryError | UnexpectedError>> {
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
      if (exception.code === FS_ERRORS.BUSY.errnoCode) {
        return {
          ok: false,
          error: {
            code: "BUSY_ERROR",
            message: `Failed to delete file at ${absolutePath} because it is being used by the system or another process.`,
            retryable: false,
            cause: exception,
            path: absolutePath,
          },
        };
      }
      if (exception.code === FS_ERRORS.NO_ENTRY.errnoCode) {
        return {
          ok: false,
          error: {
            code: "NO_ENTRY_ERROR",
            message: `Failed to delete file at ${absolutePath} because it doesn't exist.`,
            retryable: false,
            cause: exception,
            path: absolutePath,
          },
        };
      }
    }
    return {
      ok: false,
      error: createUnexpectedError({
        action: `read the text content of a file at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
