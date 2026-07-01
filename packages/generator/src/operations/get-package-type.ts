import type { Result } from "@little-nebulae/types";

import { cancel, isCancel, select } from "@clack/prompts";
import { UnexpectedError } from "@little-nebulae/exception";
import { capitalize } from "@little-nebulae/utils";
import { exit } from "node:process";

import type { PackageType } from "@/types";

import { CANCEL_MESSAGE, PACKAGE_TYPE } from "@/constants";

export async function getPackageType(): Promise<Result<PackageType, UnexpectedError>> {
  try {
    const packageType = await select({
      message: "What type of package will this be?",
      options: Object.values(PACKAGE_TYPE).map((value) => ({
        label: capitalize(value),
        value,
      })),
    });

    if (isCancel(packageType)) {
      cancel(CANCEL_MESSAGE);
      exit();
    }

    return {
      ok: true,
      data: packageType,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: "get the package type",
        cause: error,
      }),
    };
  }
}
