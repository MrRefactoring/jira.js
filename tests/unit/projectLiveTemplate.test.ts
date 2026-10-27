import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { isSchemaMismatchError } from '#/core';
import { getCollectedSchemaDrift } from '#/core/schemaAudit';
import type { Project } from '#/cloud/models';

const host = 'https://example.atlassian.net';

async function read(body: unknown, projectIdOrKey = 'AUTOTEST') {
  const fetch = vi.fn(async () => Response.json(body));
  const { createCloudClient } = await import('#/cloud/createCloudClient');
  const client = createCloudClient({ host, fetch, onSchemaMismatch: 'throw' });
  const project = await client.projects.getProject({ projectIdOrKey });

  return { project, fetch };
}

describe('Cloud project live-template responses', () => {
  let before: number;

  beforeEach(() => {
    vi.stubEnv('AUDIT_SCHEMAS', 'true');
    before = getCollectedSchemaDrift().length;
  });

  afterEach(() => vi.unstubAllEnvs());

  it.each([
    ['AUTOTEST', true],
    ['10000', false],
    ['AUTOTEST', undefined],
  ] as const)('reads project %s with live-template flag %s without drift', async (projectIdOrKey, value) => {
    const body = { id: '10000', key: 'AUTOTEST', ...(value === undefined ? {} : { isLiveTemplate: value }) };
    const { project, fetch } = await read(body, projectIdOrKey);

    expect(project).toEqual(body);
    expect(project.isLiveTemplate).toBe(value);
    expectTypeOf<Project['isLiveTemplate']>().toEqualTypeOf<boolean | undefined>();
    expect(getCollectedSchemaDrift().slice(before)).toEqual([]);
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      `${host}/rest/api/3/project/${projectIdOrKey}`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it.each(['true', null, 1])('rejects a non-boolean live-template flag: %j', async value => {
    await expect(read({ id: '10000', isLiveTemplate: value })).rejects.toSatisfy(isSchemaMismatchError);
  });

  it('continues reporting unrelated undocumented project fields', async () => {
    await read({ id: '10000', isLiveTemplate: false, undocumented: 1 });

    expect(getCollectedSchemaDrift().slice(before)).toEqual([
      {
        kind: 'keys',
        endpoint: 'GET /rest/api/3/project/AUTOTEST',
        path: '',
        keys: ['undocumented'],
        types: { undocumented: 'number' },
      },
    ]);
  });
});
