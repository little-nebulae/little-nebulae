import { z } from "zod";

export function createErrorSchema<Code extends string, Retryable extends boolean>({
  code,
  retryable,
}: {
  code: Code;
  retryable: Retryable;
}) {
  return z.object({
    code: z.literal<Code>(code),
    message: z.string(),
    retryable: z.literal<Retryable>(retryable),
  });
}
