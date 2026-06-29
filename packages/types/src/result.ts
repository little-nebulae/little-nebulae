import type { AppError } from "@little-nebulae/exception";

export interface Ok<D> {
  ok: true;
  data: D;
}

export interface Err<E extends AppError<string>> {
  ok: false;
  error: E;
}

export type Result<D, E extends AppError<string>> = Ok<D> | Err<E>;
