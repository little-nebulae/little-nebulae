import { defineConfig } from "oxlint";

import { sharedPlugins } from "@/plugins";

export const baseConfig = defineConfig({
  plugins: sharedPlugins,
  rules: {
    curly: "error",
    "typescript/consistent-type-imports": "error",
    "typescript/no-import-type-side-effects": "error",
    "typescript/only-throw-error": [
      "error",
      {
        allow: [
          {
            from: "package",
            name: "Redirect",
            package: "@tanstack/router-core",
          },
          {
            from: "package",
            name: "NotFoundError",
            package: "@tanstack/router-core",
          },
        ],
      },
    ],
  },
});
