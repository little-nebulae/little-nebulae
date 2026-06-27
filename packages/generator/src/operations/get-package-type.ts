import { multiselect } from "@clack/prompts";

export async function getPackageType() {
  const _packageType = await multiselect({
    message: "What type of package will this be?",
    options: [],
  });
}
