import { z } from "zod";

import { SUPPORTED_BUN_LOCKFILE_VERSION } from "@/constants";
import { BunCatalogSchema, BunCatalogsSchema } from "@/schemas/bun/package-json";
import { PackageJsonSchema } from "@/schemas/package-json";

export const BunLockfileWorkspaceSchema = PackageJsonSchema.pick({
  name: true,
  version: true,
  dependencies: true,
  devDependencies: true,
  peerDependencies: true,
});
export type BunLockfileWorkspaceSchema = z.infer<typeof BunLockfileWorkspaceSchema>;

export const BunLockfileWorkspacesSchema = z
  .object({
    "": BunLockfileWorkspaceSchema,
  })
  .catchall(BunLockfileWorkspaceSchema);
export type BunLockfileWorkspaces = z.infer<typeof BunLockfileWorkspacesSchema>;

export const BunLockfileSchema = z.object({
  lockfileVersion: z.literal(SUPPORTED_BUN_LOCKFILE_VERSION),
  workspaces: BunLockfileWorkspacesSchema,
  catalog: BunCatalogSchema.optional(),
  catalogs: BunCatalogsSchema.optional(),
});
export type BunLockfile = z.infer<typeof BunLockfileSchema>;
