/**
 * Collects the gaps between the schemas and what the API actually sends.
 *
 * Only active when `AUDIT_SCHEMAS=true`, which the package's own audit run sets and nothing else does. In every other
 * process this module holds an empty array and is never written to.
 *
 * It deliberately keeps findings in memory rather than writing them anywhere: `core/` ships to browsers, so it cannot
 * reach for the filesystem. The audit runner reads the collection at the end of the run and reports it.
 */

/** Symbol.for, not a local const: the collection has to survive two copies of the package in one process. */
const STORE = Symbol.for('apis-code-gen.schemaAudit');

interface DriftLocation {
  /** The request that produced the response, e.g. `GET /wiki/api/v2/spaces`. */
  endpoint: string;
  /** Where in the response body it turned up. Empty string for the top level. */
  path: string;
}

/** Keys the API sends that the schema does not describe. */
export interface UndocumentedKeys extends DriftLocation {
  kind: 'keys';
  keys: string[];
  /** What each of those keys actually held, so the missing field can be written into the schema. */
  types: Record<string, string>;
}

/**
 * A value outside the set the schema lists for a field.
 *
 * The counterpart of an undocumented key, and every bit as much a gap in the specification rather than breakage: the
 * field is described, its list of values is not complete. Kept apart from the other kind because the repair differs — a
 * missing key has to be added to a schema, a missing value to an enum.
 */
export interface UndocumentedValue extends DriftLocation {
  kind: 'value';
  /** The value the API sent. */
  value: string;
  /** The values the schema lists. */
  documented: string[];
}

export type SchemaDrift = UndocumentedKeys | UndocumentedValue;

type Store = { [STORE]?: SchemaDrift[] };

export function isSchemaAuditEnabled(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;

  return env?.AUDIT_SCHEMAS === 'true';
}

export function recordSchemaDrift(entry: SchemaDrift): void {
  const store = globalThis as Store;

  (store[STORE] ??= []).push(entry);
}

export function getCollectedSchemaDrift(): readonly SchemaDrift[] {
  return (globalThis as Store)[STORE] ?? [];
}
