import type { Result } from "@little-nebulae/types";
import type { MakeDirectoryOptions } from "node:fs";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

import { FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function makeDir(
  path: string,
  options: { recursive: true; mode?: string | number },
): Promise<Result<string, UnexpectedError>>;
export async function makeDir(
  path: string,
  options?: { recursive?: false; mode?: string | number },
): Promise<Result<null, UnexpectedError>>;
export async function makeDir(
  path: string,
  options: MakeDirectoryOptions = {},
): Promise<Result<string | null, FsNoEntryError | UnexpectedError>> {
  try {
    const createdDirPath = await mkdir(path, options);
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
