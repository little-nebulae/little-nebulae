import type { OmitKnownKeys } from "@little-nebulae/types";

import type { AccessError, NoEntryError } from "@/errors/types";

export function createAccessError({
  message,
  cause,
  path,
}: OmitKnownKeys<AccessError, "code" | "retryable">): AccessError {
  return {
    code: "ACCESS_ERROR",
    message,
    retryable: false,
    cause,
    path,
  };
}

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
