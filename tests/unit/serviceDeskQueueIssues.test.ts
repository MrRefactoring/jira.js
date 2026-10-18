import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import { SchemaMismatchError } from '#/core';
import type { Issue } from '#/serviceDeskServer/models';

const config = {
  host: 'https://jira.example.com',
  auth: { type: 'basic', username: 'admin', password: 'password' } as const,
  onSchemaMismatch: 'throw' as const,
};

function answer(values: unknown[]) {
  vi.stubGlobal('fetch', () =>
    Promise.resolve(
      Response.json({
        size: values.length,
        start: 0,
        limit: 50,
        isLastPage: true,
        values,
      }),
    ),
  );
}

afterEach(() => vi.unstubAllGlobals());

describe('Service Management Data Center queue issues', () => {
  it('preserves null fields alongside populated and omitted fields in a validated page', async () => {
    const values = [
      { key: 'TEST-1', fields: null, renderedFields: null },
      { key: 'TEST-2', fields: { summary: 'Queued request' } },
      { key: 'TEST-3' },
    ];
    answer(values);

    const page = await createServiceDeskServerClient(config).queues.getIssuesInQueue({
      serviceDeskId: '1',
      queueId: '2',
    });

    expect(page.values).toEqual(values);
    expectTypeOf<Issue['fields']>().toEqualTypeOf<Record<string, any> | null | undefined>();
  });

  it('still rejects fields that are not an object or null', async () => {
    answer([{ key: 'TEST-1', fields: [] }]);

    await expect(
      createServiceDeskServerClient(config).queues.getIssuesInQueue({
        serviceDeskId: '1',
        queueId: '2',
      }),
    ).rejects.toBeInstanceOf(SchemaMismatchError);
  });
});
