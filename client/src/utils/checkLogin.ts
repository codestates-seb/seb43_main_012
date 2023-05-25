export function containsAtSymbol(input: string): boolean {
  const regex = /@/;
  return regex.test(input);
}

export function isValidEmail(email: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
