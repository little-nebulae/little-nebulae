export async function readTextFile(path: string): Promise<string> {
  const file = Bun.file(path);
  const text = await file.text();
  return text;
}
