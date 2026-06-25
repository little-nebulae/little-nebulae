import type { OxlintConfig } from "oxlint";

export const sharedEnv: OxlintConfig["env"] = {
  es6: true,
};

export const frontendEnv: OxlintConfig["env"] = {
  ...sharedEnv,
  browser: true,
};

export const backendEnv: OxlintConfig["env"] = {
  ...sharedEnv,
  node: true,
};

export const isomorphicEnv: OxlintConfig["env"] = {
  ...sharedEnv,
  browser: true,
  node: true,
};
