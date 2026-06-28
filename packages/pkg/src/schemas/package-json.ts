import { z } from "zod";

export const WorkspacesSchema = z.array(z.string());
