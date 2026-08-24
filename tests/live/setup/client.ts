/**
 * Shared live clients for every suite.
 *
 * Suites call these in `beforeAll` rather than constructing their own, so retry and auth policy are defined once — and
 * so the three surfaces demonstrably share a single client, which is the shape the library recommends.
 *
 * {@link rawRequest} stays for the gaps a typed client cannot reach: endpoints absent from the specification, and the
 * v2 paths a test needs to inspect directly rather than through the routing under test.
 */
import { createClient, getTenantContext, type Client } from '#/core';
import { createCloudClient, type CloudClient } from '#/cloud/createCloudClient';
import { createAgileClient, type AgileClient } from '#/agile/createAgileClient';
import { createTeamsClient, type TeamsClient } from '#/teams/createTeamsClient';
import { requireLiveEnv } from './env';

let cachedClient: Client | null = null;
let cachedCloud: CloudClient | null = null;
let cachedAgile: AgileClient | null = null;
let cachedTeams: TeamsClient | null = null;
let cachedOrgId: string | null = null;

/**
 * `retry` rides out the occasional transient TLS reset or 5xx Jira Cloud throws, without masking real 4xx failures.
 */
const RETRY = { maxAttempts: 3, initialDelayMs: 300 } as const;

/**
 * The one client every surface is built from.
 *
 * Deliberately shared: two clients would mean two auth states, which under OAuth 2.0 is a live bug rather than waste.
 * That the suites all work off this single instance is the proof the sharing works.
 */
export function getClient(): Client {
  if (!cachedClient) {
    const { host, email, apiToken } = requireLiveEnv();

    cachedClient = createClient({
      host,
      auth: { type: 'basic', email, apiToken },
      retry: RETRY,
    });
  }

  return cachedClient;
}

/** Singleton Jira Cloud platform client. */
export function getCloudClient(): CloudClient {
  cachedCloud ??= createCloudClient(getClient());

  return cachedCloud;
}

/** Singleton Jira Software (Agile) client. */
export function getAgileClient(): AgileClient {
  cachedAgile ??= createAgileClient(getClient());

  return cachedAgile;
}

/**
 * Singleton Teams client.
 *
 * Built from the configuration rather than from {@link getClient}: Teams refuses OAuth 2.0, and its config says so in
 * the type, so it cannot take a client whose auth strategy is already anonymous to it.
 */
export function getTeamsClient(): TeamsClient {
  if (!cachedTeams) {
    const { host, email, apiToken } = requireLiveEnv();

    cachedTeams = createTeamsClient({
      host,
      auth: { type: 'basic', email, apiToken },
      retry: RETRY,
    });
  }

  return cachedTeams;
}

/**
 * The organization every Teams call is addressed to.
 *
 * Asked of the site rather than pinned in a secret, so pointing the suites at another tenant needs nothing but the
 * host. `JIRA_ORG_ID` overrides it, for the case where the resolution is itself what broke.
 */
export async function getOrgId(): Promise<string> {
  if (!cachedOrgId) {
    const { orgId } = requireLiveEnv();

    cachedOrgId = orgId ?? (await getTenantContext(getClient())).orgId;
  }

  return cachedOrgId;
}

/** A separate client that raises `SchemaMismatchError` instead of reporting, for suites pinning a known drift. */
export function getStrictCloudClient(): CloudClient {
  const { host, email, apiToken } = requireLiveEnv();

  return createCloudClient({
    host,
    auth: { type: 'basic', email, apiToken },
    retry: RETRY,
    onSchemaMismatch: 'throw',
  });
}

/**
 * Authenticated fetch against a raw path.
 *
 * Used where a suite must see what the API actually returned rather than what the typed client made of it — checking
 * that a wiki-markup write really landed on v2, for instance.
 */
export async function rawRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const { host, email, apiToken } = requireLiveEnv();
  const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');

  return fetch(`${host}${path}`, {
    ...init,
    headers: {
      authorization: `Basic ${credentials}`,
      accept: 'application/json',
      'content-type': 'application/json',
      ...init.headers,
    },
  });
}
