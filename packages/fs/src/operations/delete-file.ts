export async function deleteFile(path: string): Promise<void> {
  await Bun.file(path).delete();
}
