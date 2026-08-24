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
  /**
   * The organization the site belongs to, when it was pinned rather than resolved.
   *
   * Optional by design: `getOrgId()` asks the site for it, so a new tenant needs no secret added anywhere. Set
   * `JIRA_ORG_ID` only to override that — if the resolution itself is what broke, the Teams suites should still run.
   */
  orgId?: string;
  /**
   * An organization API key, for the surfaces that answer on `api.atlassian.com` rather than on a site.
   *
   * Optional: CI has no such key, and the suites that need one stand down visibly rather than failing. A site API
   * token does not substitute — these APIs answer 401 to one.
   */
  adminApiKey?: string;
}

function firstSet(...values: (string | undefined)[]): string | undefined {
  return values.find(value => value !== undefined && value.trim() !== '');
}

/** True when an organization API key is configured, which the administration suites need and CI does not have. */
export function hasAdminEnv(): boolean {
  return Boolean(firstSet(process.env.JIRA_ADMIN_API_KEY));
}

/** True when all credentials required for live tests are present. */
export function hasLiveEnv(): boolean {
  return Boolean(
    firstSet(process.env.JIRA_BASE_URL, process.env.HOST) && firstSet(process.env.JIRA_EMAIL, process.env.EMAIL),
  );
}

/** Resolve live credentials, throwing a single actionable error when absent. */
export function requireLiveEnv(): LiveTestEnv {
  const host = firstSet(process.env.JIRA_BASE_URL, process.env.HOST)?.replace(/\/+$/, '');
  const email = firstSet(process.env.JIRA_EMAIL, process.env.EMAIL);
  const apiToken = firstSet(process.env.JIRA_API_TOKEN, process.env.API_TOKEN);

  if (!host || !email || !apiToken) {
    throw new Error(
      'Live tests require JIRA_BASE_URL, JIRA_EMAIL and JIRA_API_TOKEN in the repo-root .env.\n'
        + 'JIRA_BASE_URL must be the bare site URL (e.g. https://your-site.atlassian.net) — the suites append API paths.',
    );
  }

  return {
    host,
    email,
    apiToken,
    orgId: firstSet(process.env.JIRA_ORG_ID),
    adminApiKey: firstSet(process.env.JIRA_ADMIN_API_KEY),
  };
}
