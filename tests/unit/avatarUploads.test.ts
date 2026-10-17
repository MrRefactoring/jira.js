import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServerClient, type ServerClient } from '#/server/createServerClient';
import { isApiError, isSchemaMismatchError } from '#/core';

const cropping = {
  url: '/secure/temporaryavatar?cropped=true&magic=123',
  cropperWidth: '64',
  cropperOffsetX: '9',
  cropperOffsetY: '9',
  isCroppingNeeded: 'true',
};

const avatar = { filename: 'avatar.png', content: new Uint8Array([1, 2, 3]) };

const uploads: Array<{ name: string; run: (jira: ServerClient) => Promise<unknown> }> = [
  {
    name: 'universal',
    run: jira => jira.avatars.storeTemporaryAvatarUsingMultiPart({ type: 'project', owningObjectId: '10000', avatar }),
  },
  {
    name: 'project',
    run: jira => jira.projects.storeTemporaryProjectAvatarUsingMultiPart({ projectIdOrKey: '10000', avatar }),
  },
  {
    name: 'issue type',
    run: jira => jira.issueTypes.storeTemporaryIssueTypeAvatarUsingMultiPart({ id: '10000', avatar }),
  },
  { name: 'user', run: jira => jira.users.storeTemporaryUserAvatarUsingMultiPart({ username: 'admin', avatar }) },
];

function client(): ServerClient {
  return createServerClient({ host: 'http://localhost:8080', onSchemaMismatch: 'throw' });
}

function answer(data: unknown, status = 201) {
  const fetch = vi.fn(
    async (_url: string, _init: RequestInit) =>
      new Response(`<html><body><textarea>${JSON.stringify(data)}</textarea></body></html>`, {
        status,
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      }),
  );

  vi.stubGlobal('fetch', fetch);

  return fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe('Data Center multipart avatar responses', () => {
  it.each(uploads)('$name upload accepts HTML and returns typed cropping instructions', async ({ run }) => {
    const fetch = answer(cropping);

    await expect(run(client())).resolves.toEqual({
      url: cropping.url,
      cropperWidth: 64,
      cropperOffsetX: 9,
      cropperOffsetY: 9,
      needsCropping: true,
    });

    const init = fetch.mock.calls[0][1];

    expect(new Headers(init.headers).get('Accept')).toBe('text/html');
    expect(new Headers(init.headers).get('X-Atlassian-Token')).toBe('no-check');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('avatar')).toBeInstanceOf(Blob);
  });

  it.each(uploads)('$name upload also accepts a JSON response', async ({ run }) => {
    const instructions = { cropperWidth: 64, cropperOffsetX: 9, cropperOffsetY: 9, needsCropping: true };

    vi.stubGlobal(
      'fetch',
      async () =>
        new Response(JSON.stringify(instructions), {
          status: 201,
          headers: { 'content-type': 'application/json' },
        }),
    );

    await expect(run(client())).resolves.toEqual(instructions);
  });

  it('keeps the id when Jira creates a small avatar during the upload', async () => {
    answer({ id: '10600' });

    await expect(uploads[0].run(client())).resolves.toEqual({ id: '10600' });
  });

  it.each([
    { name: 'errorMessages', body: { errorMessages: ['The image cannot be decoded'] } },
    { name: 'errors', body: { errors: { avatar: 'The image cannot be decoded' } } },
  ])('rejects $name embedded in a successful HTML response', async ({ body }) => {
    answer(body, 200);

    await expect(uploads[0].run(client())).rejects.toSatisfy(isApiError);
  });

  it('rejects a malformed HTML response', async () => {
    vi.stubGlobal(
      'fetch',
      async () =>
        new Response('<html><body>unavailable</body></html>', {
          headers: { 'content-type': 'text/html' },
        }),
    );

    await expect(uploads[0].run(client())).rejects.toSatisfy(isSchemaMismatchError);
  });

  it('still validates the cropping instructions after parsing HTML', async () => {
    answer({ ...cropping, cropperWidth: 'invalid' });

    await expect(uploads[0].run(client())).rejects.toSatisfy(isSchemaMismatchError);
  });
});
