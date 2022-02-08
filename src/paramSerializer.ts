export function paramSerializer(key: string, values?: string[]) {
  if (!values || !values.length) {
    return undefined;
  }

  return () => values.map((value) => `${key}=${value}`).join('&');
}
