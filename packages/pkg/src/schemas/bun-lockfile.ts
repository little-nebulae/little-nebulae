import { z } from "zod";

import { PackageJsonSchema } from "@/schemas/package-json";

export const BunLockfileWorkspacesSchema = z
  .object({
    "": PackageJsonSchema,
  })
  .catchall(PackageJsonSchema);
