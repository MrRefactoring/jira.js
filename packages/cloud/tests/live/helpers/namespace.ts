function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
}

function randomSuffix(): string {
  return globalThis.crypto.randomUUID().slice(0, 8);
}

export interface NamespaceParts {
  describe: string;
  test?: string;
}

export function buildNamespace(parts: NamespaceParts, label?: string): string {
  const segments = ['sdk-live'];

  if (label) segments.push(slugify(label));
  segments.push(slugify(parts.describe));
  if (parts.test) segments.push(slugify(parts.test));
  segments.push(String(Date.now()));
  segments.push(randomSuffix());

  return segments.join('-');
}

export function uid(prefix = 'sdk-live'): string {
  return `${prefix}-${Date.now()}-${randomSuffix()}`;
}
