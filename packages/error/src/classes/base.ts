export abstract class BaseError<TCode extends string, TCause = unknown> extends Error {
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override name: string;
  code: TCode;
  retryable: boolean;
  declare cause: TCause;

  constructor({
    code,
    message,
    retryable,
    cause,
  }: {
    code: TCode;
    message: string;
    retryable: boolean;
    cause: TCause;
  }) {
    super(message, { cause });
    this.code = code;
    this.retryable = retryable;
  }
}
