import { multiselect } from "@clack/prompts";

import { PACKAGE_TYPE } from "@/constants";

export async function getPackageType(): Promise<void> {
  const _packageType = await multiselect({
    message: "What type of package will this be?",
    options: Object.values(PACKAGE_TYPE).map((packageType) => ({
      label: packageType,
      value: packageType,
    })),
  });
}
