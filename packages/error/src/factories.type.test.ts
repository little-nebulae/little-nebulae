import { expectTypeOf } from "bun:test";

import type { AppError } from "@/factories";

expectTypeOf<AppError>().toMatchObjectType<{ code: string; message: string; retryable: boolean }>();
