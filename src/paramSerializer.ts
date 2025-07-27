export function paramSerializer(key: string, values?: string | string[] | number | number[]) {
  if (typeof values === 'string' || typeof values === 'number') {
    return `${key}=${values}`;
  }

  if (!values?.length) {
    return undefined;
  }

  return values.map(value => `${key}=${value}`).join('&');
}
