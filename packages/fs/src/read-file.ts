import type { UnexpectedError } from "@little-nebulae/exception";
import type { Result } from "@little-nebulae/types";

import { createUnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

import type { AccessError, NameTooLongError, NoEntryError } from "@/errors/types";

import { createAccessError, createNameTooLongError, createNoEntryError } from "@/errors/utils";

export async function readTextFile(
  path: string,
): Promise<Result<string, AccessError | NameTooLongError | NoEntryError | UnexpectedError>> {
  try {
    const file = Bun.file(path);
    const text = await file.text();
    return {
      ok: true,
      data: text,
    };
  } catch (error) {
    const absolutePath = resolve(path);
    if (error instanceof Error && "errno" in error) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const errnoException = error as ErrnoException;
      const errnoCode = errnoException.code;
      if (typeof errnoCode === "string") {
        switch (errnoCode) {
          case "EACCES": {
            return {
              ok: false,
              error: createAccessError({
                message: `The process doesn't have access to ${path}.`,
                cause: errnoException,
                path: absolutePath,
              }),
            };
          }
          case "ENAMETOOLONG": {
            return {
              ok: false,
              error: createNameTooLongError({
                cause: errnoException,
                path: absolutePath,
              }),
            };
          }
          case "ENOENT": {
            return {
              ok: false,
              error: createNoEntryError({
                message: `The file at ${absolutePath} does not exist.`,
                cause: errnoException,
                path: absolutePath,
              }),
            };
          }
          default: {
            return {
              ok: false,
              error: createUnexpectedError({
                action: `read the text content of a file at ${absolutePath}`,
                cause: error,
              }),
            };
          }
        }
      }
    }
    return {
      ok: false,
      error: createUnexpectedError({
        action: `read the text content of a file at ${absolutePath}`,
        cause: error,
      }),
    };
  }
}
