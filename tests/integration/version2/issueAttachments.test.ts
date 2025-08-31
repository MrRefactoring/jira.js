import * as fs from 'node:fs';
import { open } from 'node:fs/promises';
import { afterAll, beforeAll, describe, test, it, expect } from 'vitest';
import type { Attachment, Issue } from '@jirajs/version2/models';
import { Constants } from '@tests/integration/constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '@tests/integration/utils';

describe('IssueAttachments', () => {
  const client = getVersion2Client({ noCheckAtlassianToken: true });

  let issue: Issue;
  let attachments: Attachment[];

  beforeAll(async () => {
    await prepareEnvironment();

    issue = await client.issues.createIssue({
      fields: {
        summary: 'Issue with attachment',
        project: {
          key: Constants.testProjectKey,
        },
        issuetype: {
          name: 'Task',
        },
      },
    });
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  test.sequential('should add attachment', async ({ expect }) => {
    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'issueAttachments.test.ts',
        content: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts').toString(),
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('issueAttachments.test.ts');
    expect(attachments[0].mimeType).toBe('video/mp2t');
  });

  test.sequential('should add attachment with custom MIME type', async ({ expect }) => {
    const customMimeType = 'application/typescript';

    const customAttachment = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'issueAttachments.test.ts',
        content: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
        contentType: customMimeType,
      },
    });

    expect(!!customAttachment).toBeTruthy();
    expect(customAttachment[0].filename).toBe('issueAttachments.test.ts');
    expect(customAttachment[0].mimeType).toBe(customMimeType);
  });

  test.sequential('should add attachment with ReadableStream', async ({ expect }) => {
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('This is a test content for ReadableStream.'));
        controller.close();
      },
    });

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'readableStreamAttachment.txt',
        content: readableStream,
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('readableStreamAttachment.txt');
    expect(attachments[0].mimeType).toBe('text/plain');
  });

  it.sequential('should add attachment with readableWebStream and predefined contentLength', async () => {
    const customMimeType = 'application/typescript';
    const fileStream = await open('./tests/integration/version2/issueAttachments.test.ts');

    const { size: contentLength } = await fileStream.stat();

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'fsReadStreamAttachment.ts',
        content: fileStream.readableWebStream(),
        contentType: customMimeType,
        contentLength,
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('fsReadStreamAttachment.ts');
    expect(attachments[0].mimeType).toBe(customMimeType);
  });

  test.sequential('should add attachment with fs.createReadStream', async ({ expect }) => {
    const customMimeType = 'application/typescript';
    const fileStream = await open('./tests/integration/version2/issueAttachments.test.ts');

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'fsReadStreamAttachment.ts',
        content: fileStream.readableWebStream(),
        contentType: customMimeType,
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('fsReadStreamAttachment.ts');
    expect(attachments[0].mimeType).toBe(customMimeType);
  });

  test.sequential('should getAttachmentContent', async ({ expect }) => {
    const { content, contentType } = await client.issueAttachments.getAttachmentContent({ id: attachments[0].id });

    expect(ArrayBuffer.isView(content) || content instanceof ArrayBuffer).toBeTruthy();
    expect(['text/plain', 'video/mp2t'].includes(contentType)).toBeTruthy();
  });

  test.sequential('should remove attachment', async () => {
    await client.issues.deleteIssue({ issueIdOrKey: issue.key });
  });
});
