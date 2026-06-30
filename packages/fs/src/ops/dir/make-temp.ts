import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { FsExistError, FsNoEntryError } from "@/lib/exception/classes/error";
import { FS_ERRNO_CODES } from "@/lib/exception/constants";

export async function makeTempDir({
  prefix = "-",
}: {
  prefix?: `${string}-`;
}): Promise<Result<string, FsExistError | FsNoEntryError | UnexpectedError>> {
  const pathPrefix = join(tmpdir(), prefix);
  try {
    const path = await mkdtemp(pathPrefix);
    return {
      ok: true,
      data: path,
    };
  } catch (error) {
    const mockPath = `${pathPrefix}XXXXXX`;
    if (error instanceof Error && "errno" in error) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const exception = error as ErrnoException;
      if (exception.code === FS_ERRNO_CODES.FS_EXIST_ERROR) {
        return {
          ok: false,
          error: new FsExistError({
            message: `Failed to make a directory at ${mockPath} because it already exists.`,
            cause: exception,
            path: mockPath,
          }),
        };
      }
      if (exception.code === FS_ERRNO_CODES.FS_NO_ENTRY_ERROR) {
        return {
          ok: false,
          error: new FsNoEntryError({
            message: `Failed to make a directory at ${mockPath} because a directory component in ${dirname(mockPath)} does not exist or is a dangling symbolic link.`,
            cause: exception,
            path: mockPath,
          }),
        };
      }
    }
    return {
      ok: false,
      error: new UnexpectedError({
        action: `make a temporary directory at ${mockPath}`,
        cause: error,
      }),
    };
  }
}
