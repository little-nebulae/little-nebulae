import type { BaseError, Exception } from "@little-nebulae/exception";

export interface Context {
  id: string;
  operation: string;
  status: "succeeded" | "failed" | "aborted";
  input: unknown;
  output: unknown;
  exceptions: Exception[];
  performance?: {
    start: number;
    end: number;
    duration: number;
  };
}

export interface Ok<D, EnableContext extends boolean = true> {
  ok: true;
  data: D;
  context: EnableContext extends true ? Context : null;
}

export interface Err<E extends BaseError<string>, EnableContext extends boolean = true> {
  ok: false;
  error: E;
  context: EnableContext extends true ? Context : null;
}

export type Result<D, E extends BaseError<string>, EnableContext extends boolean = true> =
  | Ok<D, EnableContext>
  | Err<E, EnableContext>;
