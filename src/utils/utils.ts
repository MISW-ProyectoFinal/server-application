export function strToBool(str: string): boolean | undefined {
  if (str === null || str === undefined) {
    return undefined;
  }
  const lowerStr = str.toLowerCase();
  return lowerStr === 'true' || lowerStr === '1';
}
