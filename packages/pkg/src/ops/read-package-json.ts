import { readTextFile } from "@little-nebulae/fs";
import { parse } from "@little-nebulae/json";
import { join } from "node:path";
import { cwd } from "node:process";

import { BunPackageJsonSchema } from "@/schemas/package-json";

export async function readPackageJson({ rootDir = cwd() }: { rootDir?: string }) {
  const path = join(rootDir, "package.json");

  const readFileResult = await readTextFile({ path });
  if (!readFileResult.ok) {
    return readFileResult;
  }
  const fileContent = readFileResult.data;

  const parseResult = BunPackageJsonSchema.safeParse(parse(fileContent));
  if (!parseResult.success) {
    return null;
  }
  const packageJson = parseResult.data;
  return packageJson;
}
