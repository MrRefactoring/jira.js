export function paramSerializer(
  key: string,
  values?: string | string[] | number | number[] | null,
): string | undefined {
  if (values === undefined || values === null) return undefined;

  if (Array.isArray(values)) {
    if (values.length === 0) return undefined;

    return values.map((v, i) => (i === 0 ? String(v) : `${key}=${String(v)}`)).join('&');
  }

  return encodeURIComponent(String(values));
}
