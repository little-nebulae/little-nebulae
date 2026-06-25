import { defineConfig } from "oxlint";

export const baseConfig = defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import"],
  rules: {
    // ESLint core rules
    curly: "error",
    // TypeScript rules
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
    // Import rules
    "import/consistent-type-specifier-style": "error",
    "import/default": "error",
    "import/export": "error",
    "import/first": "error",
    "import/named": "error",
    "import/namespace": "error",
    "import/newline-after-import": ["error", { considerComments: true }],
    "import/no-commonjs": "error",
    "import/no-cycle": "error",
    "import/no-default-export": "error",
    "import/no-duplicates": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-namespace": "error",
    "import/no-self-import": "error",
    "import/no-unassigned-import": [
      "error",
      { allow: ["@tanstack/react-start/server-only", "@tanstack/react-start/client-only"] },
    ],
    "import/unambiguous": "error",
  },
  overrides: [
    {
      files: ["**/*.config.{js,ts}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
});
