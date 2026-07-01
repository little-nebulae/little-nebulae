import { z } from "zod";

export const DependenciesSchema = z.record(z.string(), z.string());
export const WorkspacesSchema = z.array(z.string());
export const PackageJsonSchema = z
  .object({
    name: z.string(),
    version: z.string(),
    private: z.union([z.boolean(), z.literal("true"), z.literal("false")]),
    type: z.union([z.literal("module"), z.literal("commonjs")]),
    workspaces: WorkspacesSchema,
    scripts: z.record(z.string(), z.string()),
    dependencies: DependenciesSchema,
    devDependencies: DependenciesSchema,
    peerDependencies: DependenciesSchema,
  })
  .partial();
export type PackageJson = z.infer<typeof PackageJsonSchema>;
