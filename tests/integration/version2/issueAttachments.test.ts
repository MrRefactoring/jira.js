import * as fs from 'node:fs';
import { describe, test } from 'vitest';
import type { Attachment, Issue } from '@jirajs/version2/models';
import { Constants } from '@tests/integration/constants';
import { getVersion2Client } from '@tests/integration/utils';
import { Readable } from 'node:stream';

describe.sequential('IssueAttachments', () => {
  const client = getVersion2Client({ noCheckAtlassianToken: true });

  let issue: Issue;
  let attachments: Attachment[];

  test.sequential('should add attachment', async ({ expect }) => {
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

    expect(!!issue).toBeTruthy();

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'issueAttachments.test.ts',
        file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
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
        file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
        mimeType: customMimeType,
      },
    });

    expect(!!customAttachment).toBeTruthy();
    expect(customAttachment[0].filename).toBe('issueAttachments.test.ts');
    expect(customAttachment[0].mimeType).toBe(customMimeType);
  });

  test.sequential('should add attachment with ReadableStream', async ({ expect }) => {
    const readableStream = Readable.from(['This is a test content for ReadableStream.']);

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'readableStreamAttachment.txt',
        file: readableStream,
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('readableStreamAttachment.txt');
    expect(attachments[0].mimeType).toBe('text/plain');
  });

  test.sequential('should add attachment with fs.createReadStream', async ({ expect }) => {
    const customMimeType = 'application/typescript';
    const fileStream = fs.createReadStream('./tests/integration/version2/issueAttachments.test.ts');

    attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'fsReadStreamAttachment.ts',
        file: fileStream,
        mimeType: customMimeType,
      },
    });

    expect(!!attachments).toBeTruthy();
    expect(attachments[0].filename).toBe('fsReadStreamAttachment.ts');
    expect(attachments[0].mimeType).toBe(customMimeType);
  });

  test.sequential('should getAttachmentContent', async ({ expect }) => {
    const content = await client.issueAttachments.getAttachmentContent({ id: attachments[0].id });

    expect(Buffer.isBuffer(content)).toBeTruthy();
  });

  test.sequential('should remove attachment', async () => {
    await client.issueAttachments.removeAttachment({ id: attachments[0].id });
  });
});
