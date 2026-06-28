import { z } from "zod";

import { PackageJsonSchema } from "@/schemas/package-json";

export const BunLockfileWorkspacesSchema = z.record(z.string(), PackageJsonSchema);
