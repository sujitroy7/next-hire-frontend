export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split("_")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toCompanySizeRange(str: string) {
  const range = str.split("_");
  if (range.length === 1) {
    return range[0];
  }
  range.shift();
  return range.join("-");
}
