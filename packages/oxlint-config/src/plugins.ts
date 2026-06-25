import type { OxlintConfig } from "oxlint";

export const sharedPlugins: OxlintConfig["plugins"] = [
  "eslint",
  "typescript",
  "unicorn",
  "oxc",
  "import",
];
