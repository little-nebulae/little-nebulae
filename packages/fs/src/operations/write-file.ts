import type { Result } from "@little-nebulae/types";

import { UnexpectedError } from "@little-nebulae/exception";
import { resolve } from "node:path";

export async function writeTextFile({
  path,
  text,
}: {
  path: string;
  text: string;
}): Promise<Result<number, UnexpectedError>> {
  try {
    const bytesWritten = await Bun.write(path, text);
    return {
      ok: true,
      data: bytesWritten,
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
