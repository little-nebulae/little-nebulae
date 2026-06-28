import type { UnserializableError } from "@little-nebulae/exception";
import { createUnserializableError } from "@little-nebulae/exception";
import type { Ok, Result } from "@little-nebulae/types";

import { JSON_DATA_DEFAULT_SPACE } from "@/constants";
import type { Jsonifiable } from "@/types";

export function jsonStringify(value: Jsonifiable, space?: number): Ok<string>;
export function jsonStringify(value: unknown, space?: number): Result<string, UnserializableError>;
export function jsonStringify(
  value: unknown,
  space: number = JSON_DATA_DEFAULT_SPACE,
): Result<string, UnserializableError> {
  try {
    return {
      ok: true,
      data: JSON.stringify(value, null, space),
    };
  } catch (error) {
    return {
      ok: false,
      error: createUnserializableError({ format: "JSON", cause: error }),
    };
  }
}
