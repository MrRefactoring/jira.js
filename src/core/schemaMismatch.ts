import type * as zodCore from 'zod/v4/core';
import { PRODUCT } from './productInfo.js';

/** One place where the response and the schema disagreed. */
export interface SchemaMismatchIssue {
  /** Dotted path to the value, e.g. `values.0.created`. Empty for the response root. */
  path: string;
  /** What the schema expected there. */
  expected: string;
  /**
   * What arrived, named by its type rather than quoted — except when the schema named a closed set of values, where
   * the value that was not in the set is quoted instead. See the note on `SchemaMismatchReport`.
   */
  received: string;
}

/**
 * What a caller is told when a response does not match its schema.
 *
 * Types and paths, near enough: this is meant to be pasted into a bug report, and the body it describes belongs to
 * whoever ran the request — issue summaries, account names, custom field contents. A report that leaks those turns a
 * schema bug into someone else's incident.
 *
 * One value does get quoted: the one that failed a closed set. A field the schema describes with a fixed list of
 * values cannot be holding free text, by construction — free-text fields are declared as plain strings and no list
 * ever rejects them. So quoting it risks nothing, and withholding it costs the reader the whole diagnosis: knowing
 * that `projectTypeKey` was not one of three listed values, without being told it was `product_discovery`, leaves
 * them to go and ask the API themselves.
 */
export interface SchemaMismatchReport {
  /** Method and path, without the query string — `GET /rest/api/3/project/{projectIdOrKey}/role`. */
  endpoint: string;
  issues: SchemaMismatchIssue[];
}

/**
 * What to do when a response does not match its schema.
 *
 * - `'warn'` (default) — report once per distinct problem and hand back the body unvalidated.
 * - `'silent'` — hand back the body unvalidated, say nothing.
 * - `'throw'` — raise `SchemaMismatchError`.
 * - A function — receives the report and replaces the printing entirely.
 *
 * The default is not `'throw'` on purpose. Jira's responses vary with things the library cannot see — a tenant's
 * locale, whether a feature is on, team-managed versus company-managed projects, an enum Atlassian grew on a Thursday.
 * None of those are the caller's bug, and none should take down their integration. Set `'throw'` in a test suite, where
 * a mismatch _is_ the thing under test.
 */
export type SchemaMismatchBehavior = 'warn' | 'silent' | 'throw' | ((report: SchemaMismatchReport) => void);

/** A value described the way a schema would describe it, with nothing of the value itself kept. */
function describeValue(value: unknown): string {
  if (value === null) return 'null';

  if (Array.isArray(value)) return 'array';

  return typeof value;
}

/**
 * The value sitting at a zod issue's path, walked out of the body that failed.
 *
 * Walked rather than read off `issue.input`: zod declares that field optional and leaves it off the issues it hands
 * back, so it is never there when this runs. Every segment of an issue path is an object key or an array index, so
 * the walk always has an answer, and anything no longer reachable is reported as absent — which is itself the answer
 * when the complaint is a missing field.
 */
function readValueAtPath(body: unknown, path: readonly PropertyKey[]): { reachable: boolean, value: unknown } {
  let target = body;

  for (const segment of path) {
    if (target === null || typeof target !== 'object') return { reachable: false, value: undefined };

    if (!(segment in (target as Record<PropertyKey, unknown>))) return { reachable: false, value: undefined };

    target = (target as Record<PropertyKey, unknown>)[segment];
  }

  return { reachable: true, value: target };
}

/** The same walk, reported as a type name. */
function describeTypeAtPath(body: unknown, path: readonly PropertyKey[]): string {
  const { reachable, value } = readValueAtPath(body, path);

  return reachable ? describeValue(value) : 'nothing';
}

/** The longest quoted value the report will print, past which it is cut with an ellipsis. */
const MAX_QUOTED_LENGTH = 40;

/** A closed set written the way the schema declares it: `'software' | 'service_desk' | 'business'`. */
function listValues(values: readonly unknown[]): string {
  return values.map(value => (typeof value === 'string' ? `'${value}'` : String(value))).join(' | ');
}

/** The value that failed a closed set, quoted. `undefined` for anything that is not a primitive. */
function quoteValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value.length > MAX_QUOTED_LENGTH ? `"${value.slice(0, MAX_QUOTED_LENGTH)}…"` : `"${value}"`;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);

  return undefined;
}

/** How much of a limit to name — `at most 5 characters` reads better than `at most 5`. */
function unitFor(origin: string): string {
  if (origin === 'string') return ' characters';

  if (origin === 'array' || origin === 'set') return ' items';

  return '';
}

/**
 * What the schema was asking for, in words.
 *
 * Only `invalid_type` carries an `expected` field; every other zod issue describes itself with a code and its own
 * fields, and printing the code raw is how a caller ends up reading `expected invalid_value`, which names the shape of
 * the complaint instead of the complaint. Each branch here spends the fields that code does carry.
 */
function describeExpectation(issue: zodCore.$ZodIssue): string {
  switch (issue.code) {
    case 'invalid_type':
      return issue.expected;
    case 'invalid_value':
      return issue.values.length === 1 ? listValues(issue.values) : `one of ${listValues(issue.values)}`;
    case 'too_big':
      return `at most ${issue.maximum}${unitFor(issue.origin)}`;
    case 'too_small':
      return `at least ${issue.minimum}${unitFor(issue.origin)}`;
    case 'invalid_format':
      return `a valid ${issue.format}`;
    case 'not_multiple_of':
      return `a multiple of ${issue.divisor}`;
    case 'custom':
      return issue.message;
    default:
      return issue.code;
  }
}

/**
 * Flattens zod's issues into the report's own vocabulary.
 *
 * Union branches are flattened rather than nested: a caller reading this wants to know which field is wrong, and
 * telling them the response failed all four branches of a union is a fact about zod, not about their data. The two
 * container codes are flattened for the same reason — a bad key or element is a problem with what is inside, and
 * zod's own nesting of it says nothing the inner issue does not.
 */
export function describeIssues(
  issues: readonly zodCore.$ZodIssue[],
  body: unknown,
  base: PropertyKey[] = [],
): SchemaMismatchIssue[] {
  const described: SchemaMismatchIssue[] = [];

  for (const issue of issues) {
    const path = [...base, ...issue.path];

    if (issue.code === 'invalid_union') {
      for (const branch of issue.errors) described.push(...describeIssues(branch, body, path));
      continue;
    }

    if (issue.code === 'invalid_key' || issue.code === 'invalid_element') {
      described.push(...describeIssues(issue.issues, body, path));
      continue;
    }

    if (issue.code === 'unrecognized_keys') {
      described.push({
        path: path.map(String).join('.'),
        expected: 'no undocumented keys',
        received: `undocumented: ${issue.keys.join(', ')}`,
      });
      continue;
    }

    const quoted = issue.code === 'invalid_value' ? quoteValue(readValueAtPath(body, path).value) : undefined;

    described.push({
      path: path.map(String).join('.'),
      expected: describeExpectation(issue),
      received: quoted ?? describeTypeAtPath(body, path),
    });
  }

  return described;
}

/**
 * Problems already reported, so a paginated read does not narrate the same one five hundred times.
 *
 * Process-wide and unbounded on purpose. The key space is the schemas the library ships, so it cannot grow past that
 * however long the process runs, and per-client state would defeat the point — two clients against the same site have
 * the same schema bug.
 */
const reported = new Set<string>();

/**
 * The path with its array indices collapsed, so one bad field is one problem however many elements carry it.
 *
 * `values.8.projectTypeKey` and `values.26.projectTypeKey` are the same stale enum, not two of them. Only the key is
 * collapsed — the line that gets printed keeps the concrete path, because that is the one a reader can go and look at
 * in the response.
 */
function dedupePath(path: string): string {
  return path.replace(/(^|\.)\d+(\.|$)/g, '$1[]$2');
}

/** Exposed for tests, which would otherwise leak reported state between cases. */
export function resetSchemaMismatchReporting(): void {
  reported.clear();
}

/**
 * Prints each distinct problem once, to stderr.
 *
 * Stderr rather than stdout because a CLI's output belongs to the CLI: redirected to a file or piped into `jq`, this
 * stays in the terminal and the machine-readable stream is untouched. Deduplication is what makes it bearable at all —
 * the same field over five hundred paginated issues is one line, not five hundred.
 */
export function warnOnce(report: SchemaMismatchReport): void {
  for (const issue of report.issues) {
    const key = `${report.endpoint}|${dedupePath(issue.path)}|${issue.expected}`;

    if (reported.has(key)) continue;

    reported.add(key);

    const where = issue.path === '' ? 'the response root' : `\`${issue.path}\``;

    console.warn(
      `[${PRODUCT.packageName}] ${report.endpoint} answered with something the schema does not describe: ` +
        `at ${where}, expected ${issue.expected}, got ${issue.received}. ` +
        'The response is returned unvalidated. ' +
        'Set `onSchemaMismatch` to \'silent\' to stop these, or pass a function to handle them yourself.',
    );
  }
}

/**
 * Runs the configured behavior. Returns whether the caller should throw.
 *
 * Kept here rather than inline in the transport so the decision reads in one place, and so `'throw'` is visibly the
 * only branch that ends the request.
 */
export function reportSchemaMismatch(behavior: SchemaMismatchBehavior, report: SchemaMismatchReport): boolean {
  if (typeof behavior === 'function') {
    behavior(report);

    return false;
  }

  if (behavior === 'throw') return true;

  if (behavior === 'warn') warnOnce(report);

  return false;
}
