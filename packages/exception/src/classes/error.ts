import type { ErrorObject } from "serialize-error";

import { serializeError } from "serialize-error";

export interface AppError<Code extends string> extends Error {
  code: Code;
}

export abstract class BaseError<Code extends string, Cause = unknown>
  extends Error
  implements AppError<Code>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract readonly code: Code;
  declare cause: Cause;

  constructor({ message, cause }: { message: string; cause: Cause }) {
    super(message, { cause });
  }

  serialize(mode: "shallow" | "deep" = "shallow"): ErrorObject {
    if (mode === "shallow") {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
      };
    }
    return serializeError(this, { maxDepth: 10 });
  }
}

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  readonly name = "UnexpectedError";
  readonly code = "UNEXPECTED_ERROR";

  constructor({ action, cause }: { action: string; cause: unknown }) {
    super({
      message: `Failed to ${action} because of an unexpected error.`,
      cause,
    });
  }
}

export class UnserializableError extends BaseError<"UNSERIALIZABLE_ERROR"> {
  readonly name = "UnserializableError";
  readonly code = "UNSERIALIZABLE_ERROR";
  readonly format: "JSON" | "YAML";

  constructor({ format, cause }: { format: "JSON" | "YAML"; cause: unknown }) {
    super({ message: `The given value cannot be serialized to ${format}.`, cause });
    this.format = format;
  }
}

export class ValidationError extends BaseError<"VALIDATION_ERROR"> {
  readonly name = "ValidationError";
  readonly code = "VALIDATION_ERROR";
}
