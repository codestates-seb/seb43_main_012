export function truncateTitle(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;

  // find the last space within maxLen
  let spaceIndex = str.slice(0, maxLen).lastIndexOf(' ');

  // If no space is found, just truncate at maxLen
  if (spaceIndex === -1) spaceIndex = maxLen;

  return str.slice(0, spaceIndex) + '...';
}
