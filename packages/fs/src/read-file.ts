import type { UnexpectedError } from "@little-nebulae/exception";
import type { Result } from "@little-nebulae/types";

import { createUnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

export async function readTextFile(path: string): Promise<Result<string, UnexpectedError>> {
  try {
    const file = Bun.file(path);
    const text = await file.text();
    return {
      ok: true,
      data: text,
    };
  } catch (error) {
    return {
      ok: false,
      error: createUnexpectedError({
        action: `read the text content of a file at ${resolve(path)}`,
        cause: error,
      }),
    };
  }
}
