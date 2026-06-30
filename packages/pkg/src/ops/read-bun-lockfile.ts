import type { UnexpectedError } from "@little-nebulae/exception";
import type { FsNoEntryError } from "@little-nebulae/fs";
import type { Result } from "@little-nebulae/types";

import { ValidationError } from "@little-nebulae/exception";
import { readTextFile } from "@little-nebulae/fs";
import { parse } from "@little-nebulae/json";
import { join } from "node:path";
import { cwd } from "node:process";

import type { BunLockfile } from "@/schemas/bun-lockfile";

import { BunLockfileSchema } from "@/schemas/bun-lockfile";

export async function readBunLockfile({
  rootDir = cwd(),
}: {
  rootDir?: string;
}): Promise<Result<BunLockfile, FsNoEntryError | ValidationError | UnexpectedError>> {
  const path = join(rootDir, "bun.lock");

  const readFileResult = await readTextFile({ path });
  if (!readFileResult.ok) {
    return readFileResult;
  }
  const fileContent = readFileResult.data;

  const parseJsoncResult = BunLockfileSchema.safeParse(
    parse(fileContent, undefined, { allowTrailingComma: true }),
  );
  if (!parseJsoncResult.success) {
    return {
      ok: false,
      error: new ValidationError({
        cause: parseJsoncResult.error,
      }),
    };
  }
  const bunLockfile = parseJsoncResult.data;

  return {
    ok: true,
    data: bunLockfile,
  };
}
