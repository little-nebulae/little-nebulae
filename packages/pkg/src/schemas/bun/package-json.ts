import { z } from "zod";

import {
  DependencyRecordSchema,
  WorkspaceListSchema,
  PackageJsonSchema,
} from "@/schemas/package-json";

export const BunCatalogSchema = DependencyRecordSchema;
export type BunCatalog = z.infer<typeof BunCatalogSchema>;

export const BunCatalogRecordSchema = z.record(z.string(), DependencyRecordSchema);
export type BunCatalogRecord = z.infer<typeof BunCatalogRecordSchema>;

export const BunWorkspacesSchema = z.union([
  WorkspaceListSchema,
  z
    .object({
      packages: WorkspaceListSchema,
      catalog: BunCatalogSchema,
      catalogs: BunCatalogRecordSchema,
    })
    .partial(),
]);
export type BunWorkspaces = z.infer<typeof BunWorkspacesSchema>;

export const BunPackageJsonSchema = z
  .object({
    ...PackageJsonSchema.shape,
    catalog: BunCatalogSchema,
    catalogs: BunCatalogRecordSchema,
    workspaces: BunWorkspacesSchema,
  })
  .partial();
export type BunPackageJson = z.infer<typeof BunPackageJsonSchema>;
