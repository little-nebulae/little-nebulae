import { z } from "zod";

import { SUPPORTED_BUN_LOCKFILE_VERSION } from "@/constants";
import { BunCatalogSchema, BunCatalogsSchema, PackageJsonSchema } from "@/schemas/package-json";

export const BunLockfileWorkspacesSchema = z
  .object({
    "": PackageJsonSchema,
  })
  .catchall(PackageJsonSchema);

export const BunLockfileSchema = z.object({
  lockfileVersion: z.literal(SUPPORTED_BUN_LOCKFILE_VERSION),
  workspaces: BunLockfileWorkspacesSchema,
  catalog: BunCatalogSchema,
  catalogs: BunCatalogsSchema,
});
