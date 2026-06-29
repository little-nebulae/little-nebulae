import type { Result } from "@little-nebulae/types";
import type { MakeDirectoryOptions } from "node:fs";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdir } from "node:fs/promises";

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
