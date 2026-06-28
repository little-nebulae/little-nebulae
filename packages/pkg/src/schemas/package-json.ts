import { z } from "zod";

export const DependenciesSchema = z.record(z.string(), z.string());

export const WorkspacesSchema = z.array(z.string());
