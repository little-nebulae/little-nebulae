import type { OxlintEnv } from "oxlint";

export const sharedEnv: OxlintEnv = {
  es6: true,
};

export const frontendEnv: OxlintEnv = {
  ...sharedEnv,
  browser: true,
};

export const backendEnv: OxlintEnv = {
  ...sharedEnv,
  node: true,
};

export const isomorphicEnv: OxlintEnv = {
  ...sharedEnv,
  browser: true,
  node: true,
};
