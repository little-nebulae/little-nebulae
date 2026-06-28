import type { BaseError } from "@little-nebulae/exception";

export interface Ok<D> {
  ok: true;
  data: D;
}

export interface Err<E extends BaseError<string>> {
  ok: false;
  error: E;
}

export type Result<D, E extends BaseError<string>> = Ok<D> | Err<E>;
