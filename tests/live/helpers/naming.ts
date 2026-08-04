/**
 * Run-scoped unique names for live-test resources.
 *
 * Every name carries a per-process `RUN_ID` so concurrent or repeated runs never collide, and a shared `jjs` marker so
 * the global-setup purge can recognise and sweep anything a crashed run left behind.
 */
const RUN_ID = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;

/** Marker embedded in every resource name/key created by the live suite. */
export const RESOURCE_MARKER = 'jjs';

/** Stable id for the current test process. */
export function runId(): string {
  return RUN_ID;
}

/** Human-readable, run-scoped resource name, e.g. `[jjs:abc123] my issue`. */
export function testName(label: string): string {
  return `[${RESOURCE_MARKER}:${RUN_ID}] ${label}`;
}

/**
 * A valid, unique Jira project key: uppercase letters and digits, starting with a letter, at most 10 characters.
 *
 * Jira is far stricter here than Confluence is about space keys — over ten characters, or a leading digit, and project
 * creation fails with a validation error rather than a truncated key.
 */
export function projectKey(label = ''): string {
  const suffix = `${RUN_ID}${label}`.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

  return `JJS${suffix}`.slice(0, 10);
}
