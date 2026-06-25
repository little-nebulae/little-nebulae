import { defineConfig } from "oxlint";

import { baseConfig } from "@/configs/base";

export const browserOnlyConfig = defineConfig({
  extends: [baseConfig],
  plugins: ["react"],
  rules: {
    "import/no-nodejs-modules": "error",
  },
});
