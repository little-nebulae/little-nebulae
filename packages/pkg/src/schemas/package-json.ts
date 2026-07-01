import { z } from "zod";

export const DependencyRecordSchema = z.record(z.string(), z.string());
export type DependencyRecord = z.infer<typeof DependencyRecordSchema>;

export const WorkspaceListSchema = z.array(z.string());
export type WorkspaceList = z.infer<typeof WorkspaceListSchema>;

export const PackageJsonSchema = z
  .object({
    name: z.string(),
    version: z.string(),
    private: z.union([z.boolean(), z.literal("true"), z.literal("false")]),
    type: z.union([z.literal("module"), z.literal("commonjs")]),
    workspaces: WorkspaceListSchema,
    scripts: z.record(z.string(), z.string()),
    dependencies: DependencyRecordSchema,
    devDependencies: DependencyRecordSchema,
    peerDependencies: DependencyRecordSchema,
  })
  .partial();
export type PackageJson = z.infer<typeof PackageJsonSchema>;
