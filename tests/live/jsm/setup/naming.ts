/**
 * Run-scoped names Assets will accept.
 *
 * `testName` from the shared helpers cannot be used here: it brackets the run id with a colon, and Assets rejects
 * `=;:?."` in the name of a schema, an object type or an object — a 400 saying they are reserved characters, which is
 * a good deal less obvious when it arrives from a fixture than from a test.
 *
 * The run id still carries, so a developer iterating on one suite does not collide with what the last run left in a
 * container they have not thrown away yet.
 */
import { RESOURCE_MARKER, runId } from '../../helpers/naming';

export function assetName(label: string): string {
  return `${RESOURCE_MARKER}-${runId()} ${label}`;
}

/**
 * A schema key: uppercase letters only, and short.
 *
 * Assets builds every object key from it — `JJSABC-1` — so it has to be unique on the instance. The run id is base 36,
 * and its digits are shifted into letters rather than dropped, which would collapse two runs onto one key.
 */
export function schemaKey(): string {
  const letters = [...runId()].map(character => {
    const digit = Number.parseInt(character, 10);

    return Number.isNaN(digit) ? character : String.fromCharCode('K'.charCodeAt(0) + digit);
  });

  return `JJS${letters.join('')}`.slice(0, 10).toUpperCase();
}
