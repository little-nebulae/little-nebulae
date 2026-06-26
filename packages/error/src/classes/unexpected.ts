import { BaseError } from "@/classes/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  override name = "UnexpectedError";

  constructor({ action, cause }: { action: string; cause: unknown }) {
    super({
      code: "UNEXPECTED_ERROR",
      message: `An unexpected error was caught while trying to ${action}.`,
      retryable: false,
      cause,
    });
  }
}
