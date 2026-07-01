import type { UnexpectedError } from "@little-nebulae/exception";
import type { FsNoEntryError } from "@little-nebulae/fs";
import type { Result } from "@little-nebulae/types";

import { ValidationError } from "@little-nebulae/exception";
import { readTextFile } from "@little-nebulae/fs";
import { parse } from "@little-nebulae/json";
import { join } from "node:path";
import { cwd } from "node:process";

import type { BunPackageJson } from "@/schemas/bun/package-json";

import { BunPackageJsonSchema } from "@/schemas/bun/package-json";

export async function readPackageJson({
  rootDir = cwd(),
}: {
  rootDir?: string;
}): Promise<Result<BunPackageJson, FsNoEntryError | ValidationError | UnexpectedError>> {
  const path = join(rootDir, "package.json");

  const readFileResult = await readTextFile({ path });
  if (!readFileResult.ok) {
    return readFileResult;
  }
  const fileContent = readFileResult.data;

  const parseResult = BunPackageJsonSchema.safeParse(parse(fileContent));
  if (!parseResult.success) {
    return {
      ok: false,
      error: new ValidationError({
        cause: parseResult.error,
      }),
    };
  }
  const packageJson = parseResult.data;

  return {
    ok: true,
    data: packageJson,
  };
}
