// oxlint-disable no-magic-numbers

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function getFsFriendlyDateString({
  date = new Date(),
  format = "locale",
}: {
  date?: Date;
  format?: "locale" | "ISO";
}): string {
  if (format === "locale") {
    return `${[date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join("-")}_${[
      pad(date.getHours()),
      pad(date.getMinutes()),
      pad(date.getSeconds()),
    ].join("-")}`;
  }

  return date.toISOString().replace("T", "_").replaceAll(":", "-").replace(/\..+/, "");
}
