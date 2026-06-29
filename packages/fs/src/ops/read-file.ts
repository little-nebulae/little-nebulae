import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

import { FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function readTextFile({
  path,
}: {
  path: string;
}): Promise<Result<string, FsNoEntryError | UnexpectedError>> {
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
      if (exception.code === FS_ERRNO_CODES.FS_NO_ENTRY_ERROR) {
        return {
          ok: false,
          error: new FsNoEntryError({
            message: `Failed to read file at ${absolutePath} because it doesn't exist.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
    }
    return {
      ok: false,
      error: new UnexpectedError({
        action: `read file at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
