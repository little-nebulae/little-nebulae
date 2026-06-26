import { z } from "zod";

export function createAppErrorSchema<Code extends string, Retryable extends boolean>({
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
export type AppErrorSchema = ReturnType<typeof createAppErrorSchema<string, boolean>>;
export type AppError = z.infer<AppErrorSchema>;

export function createReturnedErrorSchema<
  T extends readonly [AppErrorSchema, AppErrorSchema, ...AppErrorSchema[]],
>(schemas: T) {
  return z.discriminatedUnion("code", schemas);
}
