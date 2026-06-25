import type { OxlintConfig } from "oxlint";

export const sharedPlugins: OxlintConfig["plugins"] = [
  "eslint",
  "typescript",
  "unicorn",
  "oxc",
  "import",
];

export const webPlugins: OxlintConfig["plugins"] = [...sharedPlugins, "react"];
