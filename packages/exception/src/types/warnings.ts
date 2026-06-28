export interface BaseWarning<C extends string> {
  code: C;
  message: string;
  cause?: unknown;
}
