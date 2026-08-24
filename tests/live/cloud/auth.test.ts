/**
 * A refused credential is an error, whatever status Jira dresses it in.
 *
 * The reason this suite exists rather than a unit test alone: the behaviour it pins is Jira's, not ours. Roughly a
 * quarter of the platform's operations can be reached anonymously, and on those a dead API token does not fail the
 * request — Jira serves it as the anonymous user and reports the refusal only in `X-Seraph-LoginReason`. Both halves
 * of that sentence are checked here against the real site, so a change on Atlassian's side surfaces as a red test
 * rather than as a silently empty result in someone's integration.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { createCloudClient, type CloudClient } from '#/cloud/createCloudClient';
import { isAuthError, type ApiError } from '#/core';
import { requireLiveEnv } from '../setup/env';
import { getCloudClient, rawRequest } from '../setup/client';

const DEAD_TOKEN = 'this-api-token-was-never-valid';

describe('Jira Cloud — refused credentials (live)', () => {
  let valid: CloudClient;
  let dead: CloudClient;

  beforeAll(() => {
    const { host, email } = requireLiveEnv();

    valid = getCloudClient();
    dead = createCloudClient({ host, auth: { type: 'basic', email, apiToken: DEAD_TOKEN } });
  });

  it('answers an anonymous-accessible endpoint with 2xx and the refusal header', async () => {
    const { email } = requireLiveEnv();
    const credentials = Buffer.from(`${email}:${DEAD_TOKEN}`).toString('base64');
    const { host } = requireLiveEnv();

    const response = await fetch(`${host}/rest/api/3/project/search?maxResults=1`, {
      headers: { authorization: `Basic ${credentials}`, accept: 'application/json' },
    });

    expect(response.headers.get('x-seraph-loginreason')).toBe('AUTHENTICATED_FAILED');
    expect(response.ok).toBe(true);
  });

  it('throws instead of handing back the anonymous result', async () => {
    const error = await dead.projects.searchProjects({ maxResults: 1 }).catch((e: unknown) => e);

    expect(isAuthError(error)).toBe(true);
    expect((error as ApiError).message).toContain('x-seraph-loginreason');
  });

  it('throws on an endpoint that refuses anonymous access too', async () => {
    const error = await dead.myself.getCurrentUser().catch((e: unknown) => e);

    expect(isAuthError(error)).toBe(true);
  });

  it('leaves a working token alone — no header, no error', async () => {
    const response = await rawRequest('/rest/api/3/project/search?maxResults=1');

    expect(response.headers.get('x-seraph-loginreason')).toBeNull();

    await expect(valid.projects.searchProjects({ maxResults: 1 })).resolves.toHaveProperty('values');
  });
});
