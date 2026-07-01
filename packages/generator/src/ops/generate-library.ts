type GenerateLibraryParams =
  | {
      workspaceType: "single-package";
    }
  | { workspaceType: "multi-package"; rootPackageName: string };

export async function generateLibrary(params: GenerateLibraryParams): Promise<void> {}
