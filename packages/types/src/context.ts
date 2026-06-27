export type ContextLevel = "error" | "warn" | "info";

export interface Context {
  level: ContextLevel;
  operation: {
    id: string;
    name: string;
    input: unknown;
    output: unknown;
    exceptions: unknown[];
  };
  performance: {
    start: number;
    end: number;
    duration: number;
  };
}
