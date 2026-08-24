import { afterEach, describe, expect, it, vi } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';
import { createServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';

/**
 * Four operations declare a request body that is not an object, and every one of them used to declare
 * `Record<string, any>` instead — a shape the endpoint never accepted. Passing the right value meant casting past the
 * declaration, so the live suite carried helpers whose only job was to launder a string into an object.
 *
 * A live run can only reach two of the four. `updateEntityPropertiesValue` is a Connect app-migration endpoint reached
 * with a JWT the test tenant has no way to mint, and `attachTemporaryFile` needs an agent licence it does not hold, so
 * neither can prove what leaves the client. That is what these pin instead: the declared shape reaches the wire whole
 * and unwrapped, rather than being nested under a key or flattened into an object.
 */

interface Call {
  url: string;
  method: string;
  body: unknown;
  headers: Record<string, string>;
}

function mockFetch(response: unknown = {}): Call[] {
  const calls: Call[] = [];

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({
      url,
      method: init.method ?? 'GET',
      body: typeof init.body === 'string' ? JSON.parse(init.body) : init.body,
      headers: init.headers as Record<string, string>,
    });

    return Promise.resolve(
      new Response(JSON.stringify(response), { status: 200, headers: { 'content-type': 'application/json' } }),
    );
  });

  return calls;
}

const cloud = () =>
  createCloudClient({
    host: 'https://acme.atlassian.net',
    auth: { type: 'basic', email: 'a@b.co', apiToken: 'token' },
  });

const serviceDesk = () =>
  createServiceDeskClient({
    host: 'https://acme.atlassian.net',
    auth: { type: 'basic', email: 'a@b.co', apiToken: 'token' },
  });

afterEach(() => vi.unstubAllGlobals());

describe('an operation whose body is a lone string sends the string', () => {
  it('addWatcher sends the account id as a JSON string, not as an object', async () => {
    const calls = mockFetch();

    await cloud().issueWatchers.addWatcher({ issueIdOrKey: 'TEST-1', body: '5b10ac8d82e05b22cc7d4ef5' });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1/watchers');
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toBe('5b10ac8d82e05b22cc7d4ef5');
  });

  it('setPreference sends the value the caller gave, verbatim', async () => {
    const calls = mockFetch();

    await cloud().myself.setPreference({ key: 'jira.js.preference', body: 'stored' });

    expect(calls[0].url).toContain('/rest/api/3/mypreferences');
    expect(calls[0].method).toBe('PUT');
    expect(calls[0].body).toBe('stored');
  });
});

describe('an operation whose body is an array sends the array', () => {
  it('updateEntityPropertiesValue sends the properties as a top-level array', async () => {
    const calls = mockFetch();

    await cloud().appMigration.updateEntityPropertiesValue({
      'Atlassian-Transfer-Id': 'transfer-1',
      entityType: 'IssueProperty',
      body: [{ entityId: 10001, key: 'app.state', value: 'migrated' }],
    });

    expect(calls[0].url).toContain('/rest/atlassian-connect/1/migration/properties/IssueProperty');
    expect(calls[0].method).toBe('PUT');
    expect(calls[0].headers['Atlassian-Transfer-Id']).toBe('transfer-1');
    expect(calls[0].body).toEqual([{ entityId: 10001, key: 'app.state', value: 'migrated' }]);
  });

  it('attachTemporaryFile sends the files as a top-level array', async () => {
    const calls = mockFetch({ temporaryAttachments: [{ temporaryAttachmentId: 'temp-1', fileName: 'report.txt' }] });

    const result = await serviceDesk().servicedesk.attachTemporaryFile({
      serviceDeskId: '10',
      body: [{ name: 'file', originalFilename: 'report.txt', contentType: 'text/plain', size: 5 }],
    });

    expect(calls[0].url).toContain('/rest/servicedeskapi/servicedesk/10/attachTemporaryFile');
    expect(calls[0].method).toBe('POST');
    expect(Array.isArray(calls[0].body)).toBe(true);
    expect(calls[0].body).toEqual([
      { name: 'file', originalFilename: 'report.txt', contentType: 'text/plain', size: 5 },
    ]);
    expect(result.temporaryAttachments?.[0].temporaryAttachmentId).toBe('temp-1');
  });
});
