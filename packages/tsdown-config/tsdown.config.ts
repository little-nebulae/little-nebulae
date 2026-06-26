import { defineConfig } from "tsdown";

import { libConfig } from "@/index";

export default defineConfig({
  ...libConfig,
  deps: {
    neverBundle: ["tsdown"],
  },
});
