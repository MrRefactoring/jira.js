import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createClient, type Client } from '#/core';
import { deleteIssue as deleteCloudIssue, getIssue as getCloudIssue, editIssue } from '#/cloud/api/issues';
import { findUsersWithAllPermissions } from '#/cloud/api/userSearch';
import { DeleteIssueSchema as CloudDeleteIssueSchema, type DeleteIssue } from '#/cloud/parameters/deleteIssue';
import { deleteIssue as deleteServerIssue } from '#/server/api/issues';
import { DeleteIssueSchema as ServerDeleteIssueSchema } from '#/server/parameters/deleteIssue';
import { getAllProjects } from '#/server/api/projects';
import { getIssue as getAgileIssue } from '#/agile/api/issue';
import { getCustomerRequests } from '#/serviceDesk/api/request';
import { getMyCustomerRequests } from '#/serviceDeskServer/api/customerRequests';
import { getEvents } from '#/admin/api/events';

function transport() {
  const fetch = vi.fn(async (_url: string, _init: RequestInit) => new Response(null, { status: 204 }));
  const client = createClient({ host: 'https://example.atlassian.net', fetch });

  return { client, fetch };
}

describe('boolean query parameters', () => {
  it('requires a boolean deleteSubtasks on both surfaces', () => {
    expectTypeOf<DeleteIssue['deleteSubtasks']>().toEqualTypeOf<boolean | undefined>();

    for (const schema of [CloudDeleteIssueSchema, ServerDeleteIssueSchema]) {
      expect(schema.safeParse({ issueIdOrKey: 'EX-1', deleteSubtasks: true }).success).toBe(true);
      expect(schema.safeParse({ issueIdOrKey: 'EX-1', deleteSubtasks: 'true' }).success).toBe(false);
    }
  });

  it.each([
    ['Cloud', deleteCloudIssue],
    ['Data Center', deleteServerIssue],
  ] as const)('%s serializes both boolean values as one query value', async (_surface, deleteIssue) => {
    for (const flag of [true, false]) {
      const { client, fetch } = transport();

      await deleteIssue(client, { issueIdOrKey: 'EX-1', deleteSubtasks: flag });

      expect(fetch).toHaveBeenCalledOnce();
      expect(new URL(fetch.mock.calls[0][0]).searchParams.getAll('deleteSubtasks')).toEqual([String(flag)]);
      expect(fetch.mock.calls[0][1].method).toBe('DELETE');
    }
  });
});

const commaSeparatedCases = [
  {
    name: 'Cloud issue expansion',
    key: 'expand',
    value: 'names,schema',
    invoke: (client, value) => editIssue(client, { issueIdOrKey: 'EX-1', expand: value }),
  },
  {
    name: 'Cloud user permissions',
    key: 'permissions',
    value: 'BROWSE_PROJECTS,EDIT_ISSUES',
    invoke: (client, value) => findUsersWithAllPermissions(client, { permissions: value }),
  },
  {
    name: 'Agile issue fields',
    key: 'fields',
    value: 'summary,description',
    invoke: (client, value) => getAgileIssue(client, { issueIdOrKey: 'EX-1', fields: value }),
  },
  {
    name: 'Data Center project expansion',
    key: 'expand',
    value: 'description,lead',
    invoke: (client, value) => getAllProjects(client, { expand: value }),
  },
  {
    name: 'Service Management Data Center request expansion',
    key: 'expand',
    value: 'participant,status',
    invoke: (client, value) => getMyCustomerRequests(client, { expand: value }),
  },
  {
    name: 'Administration event actors',
    key: 'actor',
    value: 'first,second',
    invoke: (client, value) => getEvents(client, { orgId: 'org', actor: value }),
  },
] satisfies {
  name: string;
  key: string;
  value: string;
  invoke: (client: Client, value: string | string[]) => Promise<unknown>;
}[];

describe.each(commaSeparatedCases)('$name', ({ key, value, invoke }) => {
  it.each(['string', 'array'])('sends the %s form as one comma-separated value', async form => {
    const { client, fetch } = transport();

    await invoke(client, form === 'array' ? value.split(',') : value);

    expect(fetch).toHaveBeenCalledOnce();
    expect(new URL(fetch.mock.calls[0][0]).searchParams.getAll(key)).toEqual([value]);
  });
});

const repeatedKeyCases = [
  {
    name: 'Cloud issue fields',
    key: 'fields',
    invoke: (client, value) => getCloudIssue(client, { issueIdOrKey: 'EX-1', fields: value }),
  },
  {
    name: 'Cloud issue properties',
    key: 'properties',
    invoke: (client, value) => getCloudIssue(client, { issueIdOrKey: 'EX-1', properties: value }),
  },
  {
    name: 'Service Management Cloud request expansion',
    key: 'expand',
    invoke: (client, value) => getCustomerRequests(client, { expand: value }),
  },
] satisfies {
  name: string;
  key: string;
  invoke: (client: Client, value: string | string[]) => Promise<unknown>;
}[];

describe.each(repeatedKeyCases)('$name', ({ key, invoke }) => {
  it('preserves repeated keys for an array and accepts a comma-separated string', async () => {
    for (const value of ['first,second', ['first', 'second']]) {
      const { client, fetch } = transport();

      await invoke(client, value);

      expect(fetch).toHaveBeenCalledOnce();
      expect(new URL(fetch.mock.calls[0][0]).searchParams.getAll(key)).toEqual(Array.isArray(value) ? value : [value]);
    }
  });
});
