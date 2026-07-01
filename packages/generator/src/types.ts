import type { PACKAGE_TYPE, WORKSPACE_TYPE } from "@/constants";

export type WorkspaceType = (typeof WORKSPACE_TYPE)[keyof typeof WORKSPACE_TYPE];

export type PackageType = (typeof PACKAGE_TYPE)[keyof typeof PACKAGE_TYPE];
