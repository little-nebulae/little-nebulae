import { cancel, intro, outro } from "@clack/prompts";
import { readPackageJson } from "@little-nebulae/pkg";
import { exit } from "node:process";

import { ERROR_EXIT_CODE } from "@/constants";

intro("Welcome to Little Nebula's code generator!");

const readPackageJsonResult = await readPackageJson({});
if (!readPackageJsonResult.ok) {
  const error = readPackageJsonResult.error;
  switch (error.code) {
    case "UNEXPECTED_ERROR": {
      cancel("Failed to read package.json because of an unexpected error.");
      exit(ERROR_EXIT_CODE);
    }
    case "VALIDATION_ERROR": {
      cancel("Failed to read package.json because it is malformed.");
      exit(ERROR_EXIT_CODE);
    }
    case "FS_NO_ENTRY_ERROR": {
      cancel("Failed to find package.json.");
      exit(ERROR_EXIT_CODE);
    }
  }
}
const packageJson = readPackageJsonResult.data;
if (packageJson.workspaces === undefined) {
  cancel("Single-package workspace is currently unsupported.");
  exit(ERROR_EXIT_CODE);
}

outro("Good bye. See you again!");
