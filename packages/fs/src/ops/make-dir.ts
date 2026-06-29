import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

import { FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function makeDir({
  path,
  recursive,
  mode,
}: {
  path: string;
  recursive?: boolean;
  mode?: string | number;
}): Promise<Result<string | null, FsNoEntryError | UnexpectedError>> {
  try {
    const createdDirPath = await mkdir(path, { recursive, mode });
    return {
      ok: true,
      data: createdDirPath ?? null,
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
            message: `Failed to make a directory at ${absolutePath} because a directory component in ${dirname(absolutePath)} does not exist or is a dangling symbolic link.`,
            cause: exception,
            path: absolutePath,
          }),
        };
      }
    }
    return {
      ok: false,
      error: new UnexpectedError({
        action: `make a directory at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
