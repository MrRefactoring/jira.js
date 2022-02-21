export function paramSerializer(key: string, values?: string | string[]) {
  if (typeof values === 'string') {
    return `${key}=${values}`;
  }

  if (!values || !values.length) {
    return undefined;
  }

  return () => values.map((value) => `${key}=${value}`).join('&');
}
