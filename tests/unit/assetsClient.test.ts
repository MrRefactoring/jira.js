import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAssetsClient } from '#/assets/createAssetsClient';

/**
 * Assets is the one surface that does not answer on the site's own host, so where its requests go is decided here
 * rather than by the caller's `host`. Atlassian documents the base URL as
 * `https://api.atlassian.com/ex/jira/{cloudId}/jsm/assets/workspace/{workspaceId}/v1`; both that form and the shorter
 * `https://api.atlassian.com/jsm/assets/workspace/{workspaceId}/v1` were verified against a live site, with basic
 * authentication reaching the Assets router either way.
 */
function capture(): string[] {
  const urls: string[] = [];

  vi.stubGlobal('fetch', (url: string) => {
    urls.push(url);

    return Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }));
  });

  return urls;
}

const auth = { type: 'basic', email: 'user@example.com', apiToken: 'token' } as const;

describe('the Assets client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('routes to the gateway and puts the workspace in the path', async () => {
    const urls = capture();

    await createAssetsClient({ workspaceId: 'ws-1', auth }).objects.loadObject({ id: '42' });

    expect(urls).toEqual(['https://api.atlassian.com/jsm/assets/workspace/ws-1/v1/object/42']);
  });

  it('appends the workspace to a host given explicitly', async () => {
    const urls = capture();

    const assets = createAssetsClient({
      workspaceId: 'ws-1',
      host: 'https://api.atlassian.com/ex/jira/cloud-id',
      auth: { type: 'bearer', token: 'token' },
    });

    await assets.objectSchemas.findSchemas();

    expect(urls).toEqual([
      'https://api.atlassian.com/ex/jira/cloud-id/jsm/assets/workspace/ws-1/v1/objectschema/list',
    ]);
  });

  it('keeps the query string the operation builds', async () => {
    const urls = capture();

    await createAssetsClient({ workspaceId: 'ws-1', auth }).objectSchemas.findSchemas({ maxResults: 10 });

    expect(urls).toEqual(['https://api.atlassian.com/jsm/assets/workspace/ws-1/v1/objectschema/list?maxResults=10']);
  });

  it('sends the credentials it was configured with', async () => {
    const headers: Array<Record<string, string>> = [];

    vi.stubGlobal('fetch', (_url: string, init: RequestInit) => {
      headers.push(init.headers as Record<string, string>);

      return Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }));
    });

    await createAssetsClient({ workspaceId: 'ws-1', auth, onSchemaMismatch: 'silent' }).usage.getTenantUsageInfo();

    expect(headers[0]?.Authorization).toBe(`Basic ${btoa('user@example.com:token')}`);
  });

  /**
   * Under OAuth 2.0 the client is given no host at all: it resolves the cloud id itself and routes through
   * `https://api.atlassian.com/ex/jira/{cloudId}`, which is the base URL Atlassian documents for Assets once the
   * workspace and version are appended. This is the branch the whole conditional in `createWorkspaceClient` exists
   * for, so it is checked rather than assumed.
   */
  it('lets OAuth 2.0 resolve the gateway and appends the workspace to it', async () => {
    const urls: string[] = [];

    vi.stubGlobal('fetch', (url: string) => {
      urls.push(url);

      if (url === 'https://api.atlassian.com/oauth/token/accessible-resources') {
        return Promise.resolve(
          new Response(JSON.stringify([{ id: 'cloud-id', url: 'https://acme.atlassian.net', name: 'acme', scopes: [] }]), {
            status: 200,
            headers: { 'content-type': 'application/json' },
          }),
        );
      }

      return Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }));
    });

    const assets = createAssetsClient({
      workspaceId: 'ws-1',
      auth: {
        type: 'oauth2',
        clientId: 'id',
        clientSecret: 'secret',
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresAt: Date.now() + 3_600_000,
      },
    });

    await assets.objects.loadObject({ id: '42' });

    expect(urls).toContain('https://api.atlassian.com/ex/jira/cloud-id/jsm/assets/workspace/ws-1/v1/object/42');
  });

  /** The one endpoint that answers with an image rather than JSON, and the only one that asks for anything else. */
  it('asks for the image on the icon download', async () => {
    const headers: Array<Record<string, string>> = [];

    vi.stubGlobal('fetch', (_url: string, init: RequestInit) => {
      headers.push(init.headers as Record<string, string>);

      return Promise.resolve(new Response(new Uint8Array([137, 80, 78, 71]), { status: 200 }));
    });

    await createAssetsClient({ workspaceId: 'ws-1', auth }).icons.getIconImage({ id: '1' });

    expect(headers[0]?.Accept).toBe('image/png');
  });
});
