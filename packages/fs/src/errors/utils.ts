import type { OmitKnownKeys } from "@little-nebulae/types";

import type { AccessError, NameTooLongError, NoEntryError } from "@/errors/types";

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

export function createNameTooLongError({
  cause,
  path,
}: OmitKnownKeys<NameTooLongError, "code" | "message" | "retryable">): NameTooLongError {
  return {
    code: "NAME_TOO_LONG_ERROR",
    message: `The path "${path}" is too long.`,
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
