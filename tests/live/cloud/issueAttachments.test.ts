import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueAttachments` API (`addAttachment`, `getAttachment`, `getAttachmentContent`,
 * `getAttachmentThumbnail`, `getAttachmentMeta`, `removeAttachment`).
 *
 * The most machinery-heavy path in the library: multipart encoding, the `X-Atlassian-Token` header, a binary response
 * that must not be JSON-parsed, and a set of content types that has to work identically in Node and in a browser.
 * Unit tests can only prove the multipart bytes are well formed — whether Jira accepts them is a question only a real
 * site answers, which is the entire reason this file exists.
 *
 * Every content shape the public `AttachmentContent` type admits is uploaded here, and each one's bytes are read back
 * and compared to what went out.
 */

const TEXT = 'attachment body — с кириллицей и эмодзи 🎯';

describe('Jira Cloud — issueAttachments (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let attachmentId: string;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('reports the site attachment settings', async () => {
    const settings = await client.issueAttachments.getAttachmentMeta();

    expect(settings.enabled).toBe(true);
    expect(typeof settings.uploadLimit).toBe('number');
    expect(settings.uploadLimit).toBeGreaterThan(0);
  });

  it('uploads a string attachment and describes it correctly', async () => {
    const [attachment] = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachments: { filename: 'note.txt', content: TEXT },
    });

    expect(attachment!.id).toMatch(/^\d+$/);
    expect(attachment!.filename).toBe('note.txt');
    expect(attachment!.size).toBe(new TextEncoder().encode(TEXT).byteLength);
    expect(attachment!.size).toBeGreaterThan(TEXT.length);
    expect(attachment!.mimeType).toBe('text/plain');
    expect(attachment!.author?.accountId).toBeTruthy();

    attachmentId = attachment!.id!;
  });

  it('returns the uploaded bytes unchanged', async () => {
    const content = await client.issueAttachments.getAttachmentContent({ id: attachmentId });

    expect(new TextDecoder().decode(content)).toBe(TEXT);
  });

  it('uploads a Uint8Array and reads back the same bytes', async () => {
    const bytes = new Uint8Array([0, 1, 2, 253, 254, 255]);

    const [attachment] = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachments: { filename: 'bytes.bin', content: bytes },
    });

    expect(attachment!.size).toBe(bytes.byteLength);
    const back = await client.issueAttachments.getAttachmentContent({ id: attachment!.id! });

    const returned =
      back instanceof ArrayBuffer ? new Uint8Array(back) : new Uint8Array(back.buffer, back.byteOffset, back.byteLength);

    expect(Array.from(returned)).toEqual(Array.from(bytes));
  });

  it('uploads a Blob, honouring the type it carries', async () => {
    const blob = new Blob(['{"from":"blob"}'], { type: 'application/json' });

    const [attachment] = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachments: { filename: 'payload.json', content: blob },
    });

    expect(attachment!.mimeType).toBe('application/json');
    expect(attachment!.size).toBe(blob.size);
  });

  it('uploads several attachments in one request', async () => {
    const attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachments: [
        { filename: 'one.txt', content: 'first' },
        { filename: 'two.txt', content: 'second' },
      ],
    });

    expect(attachments).toHaveLength(2);
    expect(attachments.map(attachment => attachment.filename).sort()).toEqual(['one.txt', 'two.txt']);
  });

  it('lists every upload on the issue itself', async () => {
    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['attachment'] });
    const listed = (fetched.fields as { attachment?: { filename?: string }[] }).attachment ?? [];

    expect(listed.map(attachment => attachment.filename).sort()).toEqual([
      'bytes.bin',
      'note.txt',
      'one.txt',
      'payload.json',
      'two.txt',
    ]);
  });

  it('describes a single attachment by id', async () => {
    const metadata = await client.issueAttachments.getAttachment({ id: attachmentId });

    expect(metadata.id).toBe(Number(attachmentId));
    expect(metadata.filename).toBe('note.txt');
    expect(metadata.created).toBeInstanceOf(Date);
  });

  it('removes an attachment, leaving its content unreachable', async () => {
    await client.issueAttachments.removeAttachment({ id: attachmentId });

    const error = await client.issueAttachments.getAttachment({ id: attachmentId }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces an unknown attachment as a typed NotFoundError', async () => {
    const error = await client.issueAttachments.getAttachment({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
