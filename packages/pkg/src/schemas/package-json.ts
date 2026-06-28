import { z } from "zod";

export const DependenciesSchema = z.record(z.string(), z.string());
export const WorkspacesSchema = z.array(z.string());

export const BunCatalogSchema = DependenciesSchema;
export const BunCatalogsSchema = z.record(z.string(), DependenciesSchema);
