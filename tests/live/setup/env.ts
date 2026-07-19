/**
 * Live-test environment resolution.
 *
 * The live vitest config injects the repo-root `.env` into `process.env` (via `loadEnv`), so credentials are read
 * straight from there. A single, well-typed accessor keeps every suite honest: a missing credential fails loudly and
 * uniformly instead of producing a confusing 401.
 */

export interface LiveTestEnv {
  /** Site base URL, e.g. `https://your-site.atlassian.net` (no trailing slash, no API path). */
  host: string;
  /** Atlassian account email used for basic auth. */
  email: string;
  /** Atlassian API token paired with `email`. */
  apiToken: string;
}

/** True when all credentials required for live tests are present. */
export function hasLiveEnv(): boolean {
  return Boolean((process.env.JIRA_BASE_URL ?? process.env.HOST) && (process.env.JIRA_EMAIL ?? process.env.EMAIL));
}

/** Resolve live credentials, throwing a single actionable error when absent. */
export function requireLiveEnv(): LiveTestEnv {
  const host = (process.env.JIRA_BASE_URL ?? process.env.HOST)?.replace(/\/+$/, '');
  const email = process.env.JIRA_EMAIL ?? process.env.EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN ?? process.env.API_TOKEN;

  if (!host || !email || !apiToken) {
    throw new Error(
      'Live tests require JIRA_BASE_URL, JIRA_EMAIL and JIRA_API_TOKEN in the repo-root .env.\n'
        + 'JIRA_BASE_URL must be the bare site URL (e.g. https://your-site.atlassian.net) — the suites append API paths.',
    );
  }

  return { host, email, apiToken };
}
