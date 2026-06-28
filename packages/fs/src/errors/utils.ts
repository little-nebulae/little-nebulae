import type { OmitKnownKeys } from "@little-nebulae/types";

import type { NoEntryError } from "@/errors/types";

export function createNoEntryError({
  message,
  cause,
  path,
}: OmitKnownKeys<NoEntryError, "code" | "retryable">): NoEntryError {
  return {
    code: "NO_ENTRY_ERROR",
    message,
    retryable: false,
    cause,
    path,
  };
}
