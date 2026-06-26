import { createErrorSchema } from "@/factories";

export const UnexpectedErrorSchema = createErrorSchema({
  code: "UNEXPECTED_ERROR",
  retryable: false,
});
