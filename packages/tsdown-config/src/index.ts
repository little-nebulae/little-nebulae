import type { UserConfig } from "tsdown";

export const libConfig = {
  entry: "src/index.ts",
  exports: true,
  dts: true,
} as const satisfies UserConfig;

export const packageConfig = {
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/try.ts"],
  unbundle: true,
  exports: true,
  dts: {
    sourcemap: true,
  },
} as const satisfies UserConfig;
