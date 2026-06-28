import type { UnexpectedError } from "@little-nebulae/exception";
import type { Result } from "@little-nebulae/types";

import { createUnexpectedError } from "@little-nebulae/exception";

import type { NoEntryError } from "@/errors/no-entry";

import { createNoEntryError } from "@/errors/no-entry";

export async function readTextFile(
  path: string,
): Promise<Result<string, NoEntryError | UnexpectedError>> {
  try {
    const file = Bun.file(path);
    const text = await file.text();
    return {
      ok: true,
      data: text,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const errnoException = error as ErrnoException;
      if (errnoException.code === "ENOENT") {
        return {
          ok: false,
          error: createNoEntryError({
            message: `The file at ${path} does not exist.`,
            cause: errnoException,
            path,
          }),
        };
      }
    }
    return {
      ok: false,
      error: createUnexpectedError({
        action: `read the text content of a file at ${path}`,
        cause: error,
      }),
    };
  }
}
