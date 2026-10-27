import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import type { QueueSettings } from '#/serviceDeskServer/models';
import { SchemaMismatchError } from '#/core';

const config = {
  host: 'https://jira.example.com',
  auth: { type: 'basic', username: 'admin', password: 'password' } as const,
  onSchemaMismatch: 'throw' as const,
};

afterEach(() => vi.unstubAllGlobals());

describe('Service Management Data Center queue settings', () => {
  it('returns validated boolean settings through the public client', async () => {
    const body = { queueCount: { includeQueueCount: true, useCachedQueueCount: false } };
    const fetch = vi.fn().mockResolvedValue(Response.json(body));
    vi.stubGlobal('fetch', fetch);

    const settings = await createServiceDeskServerClient(config).queueSettings.getQueueSettingsOnProject({
      projectKey: 'TEST',
    });

    expect(settings).toEqual(body);
    expectTypeOf(settings).toEqualTypeOf<QueueSettings>();
    expectTypeOf(settings.queueCount.includeQueueCount).toEqualTypeOf<boolean>();
    expectTypeOf(settings.queueCount.useCachedQueueCount).toEqualTypeOf<boolean>();
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      'https://jira.example.com/rest/servicedeskapi/admin/queues/TEST',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it.each([
    {},
    { queueCount: { includeQueueCount: true } },
    { queueCount: { includeQueueCount: 'true', useCachedQueueCount: false } },
  ])('rejects missing or incorrectly typed settings: %j', async body => {
    vi.stubGlobal('fetch', () => Promise.resolve(Response.json(body)));

    await expect(
      createServiceDeskServerClient(config).queueSettings.getQueueSettingsOnProject({ projectKey: 'TEST' }),
    ).rejects.toBeInstanceOf(SchemaMismatchError);
  });
});
