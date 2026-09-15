import { afterEach, describe, expect, it, vi } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';

/**
 * The rule these guard: a rich-text field given a plain string is wiki markup, which v3 rejects and v2 parses. The
 * write goes to v2, the result is read back through v3, and the caller gets a real document either way.
 *
 * Verified against a live site before it was built — `h2.`, `*bold*` and `{code}` come back as `heading`, a `strong`
 * mark and a `codeBlock`. What is left to check here is the routing itself: which URL each shape reaches.
 */

interface Call {
  url: string;
  method: string;
  body: unknown;
}

function mockFetch(): Call[] {
  const calls: Call[] = [];

  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    calls.push({
      url,
      method: init.method ?? 'GET',
      body: typeof init.body === 'string' ? JSON.parse(init.body) : init.body,
    });

    return Promise.resolve(
      new Response(
        JSON.stringify({
          id: '10001',
          key: 'TEST-1',
          self: 'https://acme.atlassian.net/rest/api/3/issue/10001',
          body: { type: 'doc', version: 1, content: [] },
          comment: { type: 'doc', version: 1, content: [] },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      ),
    );
  });

  return calls;
}

const client = () =>
  createCloudClient({
    host: 'https://acme.atlassian.net',
    auth: { type: 'basic', email: 'a@b.co', apiToken: 'token' },
  });

const DOCUMENT = { type: 'doc' as const, version: 1, content: [] };

afterEach(() => vi.unstubAllGlobals());

describe('a document takes the v3 path', () => {
  it('posts a comment straight to v3 with no second request', async () => {
    const calls = mockFetch();

    await client().issueComments.addComment({ issueIdOrKey: 'TEST-1', body: DOCUMENT });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1/comment');
  });

  it('posts a worklog straight to v3', async () => {
    const calls = mockFetch();

    await client().issueWorklogs.addWorklog({ issueIdOrKey: 'TEST-1', comment: DOCUMENT });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1/worklog');
  });
});

describe('a string takes the v2 path, then reads back through v3', () => {
  it('writes the comment to v2 and re-reads it from v3', async () => {
    const calls = mockFetch();

    await client().issueComments.addComment({ issueIdOrKey: 'TEST-1', body: 'h2. Heading' });

    expect(calls).toHaveLength(2);
    expect(calls[0].method).toBe('POST');
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/comment');
    expect(calls[0].body).toMatchObject({ body: 'h2. Heading' });

    expect(calls[1].method).toBe('GET');
    expect(calls[1].url).toContain('/rest/api/3/issue/TEST-1/comment/10001');
  });

  it('updates a comment through v2 and re-reads the same id', async () => {
    const calls = mockFetch();

    await client().issueComments.updateComment({
      issueIdOrKey: 'TEST-1',
      id: '99',
      body: { body: '*bold*' },
    });

    expect(calls[0].method).toBe('PUT');
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/comment/99');
    expect(calls[1].url).toContain('/rest/api/3/issue/TEST-1/comment/99');
  });

  it('writes the worklog to v2 and re-reads it from v3', async () => {
    const calls = mockFetch();

    await client().issueWorklogs.addWorklog({
      issueIdOrKey: 'TEST-1',
      comment: '{code}x{code}',
      timeSpent: '1h',
    });

    expect(calls).toHaveLength(2);
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/worklog');
    expect(calls[0].body).toMatchObject({ comment: '{code}x{code}', timeSpent: '1h' });
    expect(calls[1].url).toContain('/rest/api/3/issue/TEST-1/worklog/10001');
  });

  it('creates an issue through v2 without a re-read — the response carries no document', async () => {
    const calls = mockFetch();

    await client().issues.createIssue({ fields: { summary: 'S', description: 'h1. Plain' } });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/2/issue');
  });

  it('leaves createIssue on v3 when the description is already a document', async () => {
    const calls = mockFetch();

    await client().issues.createIssue({ fields: { summary: 'S', description: DOCUMENT } });

    expect(calls[0].url).toContain('/rest/api/3/issue');
  });

  it('edits an issue through v2 when the description is wiki markup', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({ issueIdOrKey: 'TEST-1', fields: { description: 'h1. Plain' } });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1');
    expect(calls[0].method).toBe('PUT');
    expect(calls[0].body).toMatchObject({ fields: { description: 'h1. Plain' } });
  });

  it('edits an issue through v2 when the environment is wiki markup', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({ issueIdOrKey: 'TEST-1', fields: { environment: '{code}x{code}' } });

    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1');
  });

  it('carries the query parameters onto the v2 edit', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({
      issueIdOrKey: 'TEST-1',
      notifyUsers: false,
      fields: { description: 'h1. Plain' },
    });

    expect(calls[0].url).toContain('notifyUsers=false');
  });

  it('leaves editIssue on v3 when the description is already a document', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({ issueIdOrKey: 'TEST-1', fields: { description: DOCUMENT } });

    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1');
  });

  it('transitions an issue through v2 when the description is wiki markup', async () => {
    const calls = mockFetch();

    await client().issues.doTransition({
      issueIdOrKey: 'TEST-1',
      transition: { id: '21' },
      fields: { description: 'h1. Done' },
    });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/transitions');
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toMatchObject({ transition: { id: '21' }, fields: { description: 'h1. Done' } });
  });

  it('leaves doTransition on v3 when the description is already a document', async () => {
    const calls = mockFetch();

    await client().issues.doTransition({
      issueIdOrKey: 'TEST-1',
      transition: { id: '21' },
      fields: { description: DOCUMENT },
    });

    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1/transitions');
  });

  it('still takes v2 when the other rich-text field is cleared with null', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({
      issueIdOrKey: 'TEST-1',
      fields: { description: 'h1. Plain', environment: null },
    });

    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1');
  });
});

describe('wiki markup and a document in one write reach no endpoint', () => {
  const MIXED = { description: 'h1. Plain', environment: DOCUMENT };

  it('refuses createIssue before sending anything', async () => {
    const calls = mockFetch();

    await expect(client().issues.createIssue({ fields: MIXED })).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });

  it('refuses editIssue before sending anything', async () => {
    const calls = mockFetch();

    await expect(client().issues.editIssue({ issueIdOrKey: 'TEST-1', fields: MIXED })).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });

  it('refuses doTransition before sending anything', async () => {
    const calls = mockFetch();

    await expect(
      client().issues.doTransition({
        issueIdOrKey: 'TEST-1',
        transition: { id: '21' },
        fields: { description: DOCUMENT, environment: '{code}x{code}' },
      }),
    ).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });
});

describe('rich text carried by update is routed like rich text in fields', () => {
  it('edits through v2 when update sets the description as wiki markup', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({ issueIdOrKey: 'TEST-1', update: { description: [{ set: 'h1. Plain' }] } });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1');
    expect(calls[0].body).toMatchObject({ update: { description: [{ set: 'h1. Plain' }] } });
  });

  it('creates through v2 when update sets the environment as wiki markup', async () => {
    const calls = mockFetch();

    await client().issues.createIssue({ fields: { summary: 'S' }, update: { environment: [{ set: '{code}x{code}' }] } });

    expect(calls[0].url).toContain('/rest/api/2/issue');
  });

  it('transitions through v2 when update adds a wiki markup comment', async () => {
    const calls = mockFetch();

    await client().issues.doTransition({
      issueIdOrKey: 'TEST-1',
      transition: { id: '21' },
      update: { comment: [{ add: { body: '*Done*' } }] },
    });

    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/transitions');
  });

  it('keeps a transition on v3 when update adds a document comment', async () => {
    const calls = mockFetch();

    await client().issues.doTransition({
      issueIdOrKey: 'TEST-1',
      transition: { id: '21' },
      update: { comment: [{ add: { body: DOCUMENT } }] },
    });

    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1/transitions');
  });

  it('refuses markup in fields beside a document comment in update before sending anything', async () => {
    const calls = mockFetch();

    await expect(
      client().issues.doTransition({
        issueIdOrKey: 'TEST-1',
        transition: { id: '21' },
        fields: { description: 'h1. Done' },
        update: { comment: [{ add: { body: DOCUMENT } }] },
      }),
    ).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });

  it('refuses a document in fields beside an edited markup comment in update before sending anything', async () => {
    const calls = mockFetch();

    await expect(
      client().issues.editIssue({
        issueIdOrKey: 'TEST-1',
        fields: { description: DOCUMENT },
        update: { comment: [{ edit: { id: '1', body: 'plain' } }] },
      }),
    ).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });
  it('transitions through v2 when update logs work with a wiki markup comment', async () => {
    const calls = mockFetch();

    await client().issues.doTransition({
      issueIdOrKey: 'TEST-1',
      transition: { id: '21' },
      update: { worklog: [{ add: { timeSpent: '1h', comment: 'Fixed' } }] },
    });

    expect(calls[0].url).toContain('/rest/api/2/issue/TEST-1/transitions');
  });

  it('keeps an edit on v3 when update logs work with a document comment', async () => {
    const calls = mockFetch();

    await client().issues.editIssue({
      issueIdOrKey: 'TEST-1',
      update: { worklog: [{ add: { timeSpent: '1h', comment: DOCUMENT } }] },
    });

    expect(calls[0].url).toContain('/rest/api/3/issue/TEST-1');
  });

  it('refuses markup in fields beside a document worklog comment in update before sending anything', async () => {
    const calls = mockFetch();

    await expect(
      client().issues.doTransition({
        issueIdOrKey: 'TEST-1',
        transition: { id: '21' },
        fields: { description: 'h1. Done' },
        update: { worklog: [{ add: { timeSpent: '1h', comment: DOCUMENT } }] },
      }),
    ).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });
});
