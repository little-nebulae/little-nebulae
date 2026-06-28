import type { UnserializableError } from "@little-nebulae/exception";
import { createUnserializableError } from "@little-nebulae/exception";
import type { Ok, Result } from "@little-nebulae/types";

import type { Jsonifiable } from "@/types";

export function jsonStringify(value: Jsonifiable): Ok<string>;
export function jsonStringify(value: unknown): Result<string, UnserializableError>;
export function jsonStringify(value: unknown): Result<string, UnserializableError> {
  try {
    return {
      ok: true,
      data: JSON.stringify(value),
    };
  } catch (error) {
    return {
      ok: false,
      error: createUnserializableError({ format: "JSON", cause: error }),
    };
  }
}
