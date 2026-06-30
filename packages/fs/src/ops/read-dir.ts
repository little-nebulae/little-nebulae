import type { Result } from "@little-nebulae/types";
import type { Dirent } from "node:fs";

import { UnexpectedError } from "@little-nebulae/exception";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

export async function readDir({
  path,
  recursive = false,
}: {
  path: string;
  recursive?: boolean;
}): Promise<Result<Dirent[], UnexpectedError>> {
  try {
    const dirEntries = await readdir(path, { withFileTypes: true, recursive });
    return {
      ok: true,
      data: dirEntries,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: `write a text file to ${resolve(path)}`,
        cause: error,
      }),
    };
  }
}
