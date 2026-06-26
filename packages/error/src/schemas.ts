import type { z } from "zod";

import { createAppErrorSchema } from "@/factories";

export const UnexpectedErrorSchema = createAppErrorSchema({
  code: "UNEXPECTED_ERROR",
  retryable: false,
});
export type UnexpectedError = z.infer<typeof UnexpectedErrorSchema>;
