import { z } from "zod";

import { DependenciesSchema, WorkspacesSchema, PackageJsonSchema } from "@/schemas/package-json";

export const BunCatalogSchema = DependenciesSchema;
export type BunCatalog = z.infer<typeof BunCatalogSchema>;

export const BunCatalogsSchema = z.record(z.string(), DependenciesSchema);
export type BunCatalogs = z.infer<typeof BunCatalogsSchema>;

export const BunWorkspacesSchema = z.union([
  WorkspacesSchema,
  z
    .object({
      packages: WorkspacesSchema,
      catalog: BunCatalogSchema,
      catalogs: BunCatalogsSchema,
    })
    .partial(),
]);
export type BunWorkspaces = z.infer<typeof BunWorkspacesSchema>;

export const BunPackageJsonSchema = z
  .object({
    ...PackageJsonSchema.shape,
    catalog: BunCatalogSchema,
    catalogs: BunCatalogsSchema,
    workspaces: BunWorkspacesSchema,
  })
  .partial();
export type BunPackageJson = z.infer<typeof BunPackageJsonSchema>;
