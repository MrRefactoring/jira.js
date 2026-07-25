import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `serverInfo` API (`getServerInfo`).
 *
 * The smallest possible endpoint, and for that reason the most useful one to pin precisely: it is the first call most
 * users make, and it is the cheapest place to catch a broken base URL, a broken auth header, or a schema that has
 * drifted from what Cloud actually sends.
 */
describe('Jira Cloud — serverInfo.getServerInfo (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('returns the site identity, typed as ServerInformation declares', async () => {
    const info = await client.serverInfo.getServerInfo();

    expect(typeof info.baseUrl).toBe('string');
    expect(info.baseUrl).toMatch(/^https:\/\//);
    // Cloud reports itself as such; a Server/DC response here would mean the
    // client was pointed somewhere this library does not support.
    expect(info.deploymentType).toBe('Cloud');
    expect(typeof info.version).toBe('string');
    expect(Array.isArray(info.versionNumbers)).toBe(true);
  });

  it('reports a build date and server time that parse as real dates', async () => {
    const info = await client.serverInfo.getServerInfo();

    // The schema coerces both, so what a live call proves is that Jira sends something
    // coercion accepts — a token it could not read would arrive as an Invalid Date.
    expect(Number.isNaN(info.buildDate!.getTime())).toBe(false);
    expect(Number.isNaN(info.serverTime!.getTime())).toBe(false);
  });

  it('agrees with the host the client was configured with', async () => {
    const info = await client.serverInfo.getServerInfo();
    const configured = (process.env.JIRA_BASE_URL ?? process.env.HOST)!.replace(/\/+$/, '');

    // `host` is the bare site URL and the API appends its own paths — if these
    // diverge, requests are being sent somewhere other than where the caller meant.
    expect(info.baseUrl?.replace(/\/+$/, '')).toBe(configured);
  });
});
