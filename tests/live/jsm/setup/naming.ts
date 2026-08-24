import { RESOURCE_MARKER, runId } from '../../helpers/naming';

export function assetName(label: string): string {
  return `${RESOURCE_MARKER}-${runId()} ${label}`;
}

export function schemaKey(): string {
  const letters = [...runId()].map(character => {
    const digit = Number.parseInt(character, 10);

    return Number.isNaN(digit) ? character : String.fromCharCode('K'.charCodeAt(0) + digit);
  });

  return `JJS${letters.join('')}`.slice(0, 10).toUpperCase();
}
