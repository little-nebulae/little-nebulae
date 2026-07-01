import type { PACKAGE_TYPE } from "@/constants";

export type PackageType = (typeof PACKAGE_TYPE)[keyof typeof PACKAGE_TYPE];
