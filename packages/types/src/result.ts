import type { Context } from "@/context";

export interface Ok<D, C extends boolean = true> {
  ok: true;
  data: D;
  context: C extends true ? Context : null;
}

export interface Err<E extends Error, C extends boolean = true> {
  ok: false;
  error: E;
  context: C extends true ? Context : null;
}

export type Result<D, E extends Error, C extends boolean = true> = Ok<D, C> | Err<E, C>;
