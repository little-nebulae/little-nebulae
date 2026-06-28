import type { Jsonifiable } from "@/types";

export function jsonStringify(value: Jsonifiable): string {
  return JSON.stringify(value);
}
