export class BaseError<TCode extends string, TCause = unknown> extends Error {
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
    this.name = "BaseError";
    this.code = code;
    this.retryable = retryable;
  }
}
