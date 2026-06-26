import type { z } from "zod";

import type { createErrorSchema } from "@/factories";
import type { UnexpectedErrorSchema } from "@/schemas";

export type ErrorType = z.infer<ReturnType<typeof createErrorSchema<string, boolean>>>;

export type UnexpectedError = z.infer<typeof UnexpectedErrorSchema>;
