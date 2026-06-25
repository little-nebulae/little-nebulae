import { defineConfig } from "oxlint";

import { sharedPlugins } from "@/options/plugins/native";
import { sharedRules } from "@/options/rules";

export const baseConfig = defineConfig({
  plugins: sharedPlugins,
  rules: sharedRules,
});
