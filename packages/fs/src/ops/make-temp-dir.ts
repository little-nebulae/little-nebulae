import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function makeTempDir(prefix = ""): Promise<Result<string, UnexpectedError>> {
  try {
    const path = await mkdtemp(join(tmpdir(), prefix));
    return {
      ok: true,
      data: path,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: "make a temporary directory",
        cause: error,
      }),
    };
  }
}
