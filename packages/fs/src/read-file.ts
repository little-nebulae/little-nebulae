import type { UnexpectedError } from "@little-nebulae/exception";
import type { Result } from "@little-nebulae/types";

import { createUnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

import type { NoEntryError } from "@/lib/exception/errors";

import { FS_ERRORS } from "@/lib/exception/constants";

export async function readTextFile(
  path: string,
): Promise<Result<string, NoEntryError | UnexpectedError>> {
  try {
    const file = Bun.file(path);
    const text = await file.text();
    return {
      ok: true,
      data: text,
    };
  } catch (error) {
    const absolutePath = resolve(path);
    if (error instanceof Error && "errno" in error) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const exception = error as ErrnoException;
      if (exception.code === FS_ERRORS.NO_ENTRY.errnoCode) {
        return {
          ok: false,
          error: {
            code: "NO_ENTRY_ERROR",
            message: `No file exists at ${absolutePath}.`,
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
