export function serializeSearchParamValue(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined;
    }

    if (value.every((item): item is string => typeof item === 'string')) {
      return value.join(',');
    }

    return JSON.stringify(value);
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

export function buildUrlWithSearchParams(baseUrl: string, searchParams?: Record<string, unknown>): string {
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return baseUrl;
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          params.append(key, String(item));
        }
      }
    } else {
      const serialized = serializeSearchParamValue(value);

      if (serialized !== undefined) {
        params.set(key, serialized);
      }
    }
  }

  const query = params.toString();

  if (!query) {
    return baseUrl;
  }

  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}${query}`;
}
