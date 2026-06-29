import type { Result } from "@little-nebulae/types";
import type { MakeDirectoryOptions } from "node:fs";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdir } from "node:fs/promises";

export async function makeTempDir(
  path: string,
  options: MakeDirectoryOptions,
): Promise<Result<string | null, UnexpectedError>> {
  try {
    const createdDirPath = await mkdir(path, options);
    return {
      ok: true,
      data: createdDirPath ?? null,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: `make a directory at ${path}`,
        cause: error,
      }),
    };
  }
}
