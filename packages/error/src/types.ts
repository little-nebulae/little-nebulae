import type { z } from "zod";

import type { createErrorSchema } from "@/factories";

export type ErrorType = z.infer<ReturnType<typeof createErrorSchema<string, boolean>>>;
