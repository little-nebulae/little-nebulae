import { defineConfig } from "oxlint";

import { sharedEnv } from "@/options/env";
import { sharedPlugins } from "@/options/plugins/native";
import { sharedRules } from "@/options/rules";

export const baseConfig = defineConfig({
  plugins: sharedPlugins,
  rules: sharedRules,
  env: sharedEnv,
});
