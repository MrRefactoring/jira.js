import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient, rawRequest } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, documentOf, type TestIssue } from '../setup/fixtures';

/**
 * The rich-text routing, against a real Jira.
 *
 * The unit suite proves which URL each shape reaches. Only a live site can prove the part that actually matters: that
 * Jira converts the markup, and that what comes back is a document with the structure the markup described. Nothing
 * about that is guaranteed by the specification — it was established by measurement, and this is the test that keeps
 * it established.
 */

const WIKI = 'h2. Heading\n\n*bold* and _italic_\n\n{code}const x = 1;{code}';

/** Walks an ADF tree collecting node types, so a shape can be asserted without pinning exact output. */
function nodeTypes(document: unknown): string[] {
  const types: string[] = [];
  const walk = (node: { type?: string; content?: unknown[] }) => {
    if (node.type) types.push(node.type);
    for (const child of node.content ?? []) walk(child as never);
  };

  walk(document as never);

  return types;
}

/** Every mark applied anywhere in the tree — `strong`, `em` and so on. */
function marks(document: unknown): string[] {
  return [...JSON.stringify(document).matchAll(/"type":"(strong|em|code|underline|strike)"/g)].map(m => m[1]);
}

describe('wiki markup routes through v2 and returns a document', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker, { summary: 'adf routing' });
  });

  afterAll(() => tracker.cleanup());

  it('converts headings, marks and code blocks rather than escaping them', async () => {
    const comment = await client.issueComments.addComment({ issueIdOrKey: issue.key, body: WIKI });

    tracker.defer(async () => {
      await client.issueComments.deleteComment({ issueIdOrKey: issue.key, id: comment.id! });
    });

    // The declared return type says Document, and this is what makes that true.
    expect(comment.body).toMatchObject({ type: 'doc', version: 1 });

    const types = nodeTypes(comment.body);

    expect(types).toContain('heading');
    expect(types).toContain('codeBlock');
    expect(marks(comment.body)).toEqual(expect.arrayContaining(['strong', 'em']));

    // Escaped markup would show up as the literal source text in a single node.
    expect(JSON.stringify(comment.body)).not.toContain('h2.');
  });

  it('sends a document straight to v3, unchanged', async () => {
    const comment = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      body: documentOf('untouched'),
    });

    tracker.defer(async () => {
      await client.issueComments.deleteComment({ issueIdOrKey: issue.key, id: comment.id! });
    });

    expect(nodeTypes(comment.body)).toEqual(['doc', 'paragraph', 'text']);
    expect(JSON.stringify(comment.body)).toContain('untouched');
  });

  it('reads back the same document a second request later', async () => {
    const created = await client.issueComments.addComment({ issueIdOrKey: issue.key, body: 'h3. Persisted' });

    tracker.defer(async () => {
      await client.issueComments.deleteComment({ issueIdOrKey: issue.key, id: created.id! });
    });

    // Fetching independently proves the conversion was stored, not merely echoed.
    const fetched = await client.issueComments.getComment({ issueIdOrKey: issue.key, id: created.id! });

    expect(nodeTypes(fetched.body)).toContain('heading');
    expect(fetched.body).toEqual(created.body);
  });

  it('leaves the stored comment readable through v2 as markup', async () => {
    const created = await client.issueComments.addComment({ issueIdOrKey: issue.key, body: '*still markup*' });

    tracker.defer(async () => {
      await client.issueComments.deleteComment({ issueIdOrKey: issue.key, id: created.id! });
    });

    // v2 renders the same comment back as wiki markup — the two APIs are two
    // views of one stored document, which is why routing between them is sound.
    const response = await rawRequest(`/rest/api/2/issue/${issue.key}/comment/${created.id}`);
    const body = (await response.json()) as { body: string };

    expect(response.status).toBe(200);
    expect(typeof body.body).toBe('string');
    expect(body.body).toContain('still markup');
  });

  it('routes a worklog comment the same way', async () => {
    const worklog = await client.issueWorklogs.addWorklog({
      issueIdOrKey: issue.key,
      comment: 'h4. Worklog note',
      timeSpent: '5m',
    });

    tracker.defer(async () => {
      await client.issueWorklogs.deleteWorklog({ issueIdOrKey: issue.key, id: worklog.id! });
    });

    expect(nodeTypes(worklog.comment)).toContain('heading');
  });

  it('accepts markup in a description at issue creation', async () => {
    const created = await createTestIssue(client, tracker, {
      summary: 'markup description',
      description: 'h2. Described',
    });

    const fetched = await client.issues.getIssue({ issueIdOrKey: created.key });
    const description = (fetched.fields as { description?: unknown }).description;

    expect(nodeTypes(description)).toContain('heading');
  });
});
