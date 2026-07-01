export function capitalize(str: string): string {
  // oxlint-disable-next-line no-magic-numbers
  return str.charAt(0).toUpperCase() + str.slice(1);
}
