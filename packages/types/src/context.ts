import type { Exception } from "@little-nebulae/exception";

export type ContextLevel = "error" | "warn" | "info";

export interface Context {
  level: ContextLevel;
  operation: {
    id: string;
    name: string;
    input: unknown;
    output: unknown;
    exceptions: Exception[];
  };
  performance?: {
    start: number;
    end: number;
    duration: number;
  };
}
