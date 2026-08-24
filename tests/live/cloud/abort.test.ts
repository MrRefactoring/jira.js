/**
 * Cancellation, against a real request rather than a stubbed one.
 *
 * A unit test can prove the signal reaches `fetch`; only a real request proves it reaches the socket, and that the
 * rejection arrives promptly rather than after the response would have.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { isAuthError, isNetworkError } from '#/core';
import { getCloudClient } from '../setup/client';

describe('Jira Cloud — cancellation (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('aborts an in-flight request and rethrows the reason unwrapped', async () => {
    const controller = new AbortController();
    const reason = new Error('caller changed their mind');

    const pending = client.projects.searchProjects({ maxResults: 50 }, { signal: controller.signal });

    controller.abort(reason);

    await expect(pending).rejects.toBe(reason);
  });

  it('rejects immediately when the signal is already aborted', async () => {
    const started = Date.now();
    const error = await client.projects
      .searchProjects({ maxResults: 1 }, { signal: AbortSignal.abort() })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNetworkError(error)).toBe(false);
    expect(isAuthError(error)).toBe(false);
    expect(Date.now() - started).toBeLessThan(2_000);
  });

  it('lets a request finish when the signal is never aborted', async () => {
    const controller = new AbortController();

    await expect(
      client.projects.searchProjects({ maxResults: 1 }, { signal: controller.signal }),
    ).resolves.toHaveProperty('values');
  });
});
