import * as fs from 'fs';
import { afterAll, beforeAll, test } from 'vitest';
import type { Attachment, Issue } from '@jirajs/version3/models';
import { Constants } from '@tests/integration/constants';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '@tests/integration/utils';

const client = getVersion3Client({ noCheckAtlassianToken: true });

let issue: Issue;
let attachments: Attachment[];

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

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
      file: fs.readFileSync('./tests/integration/version3/issueAttachments.test.ts'),
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

test.sequential('should getAttachmentContent', async ({ expect }) => {
  const content = await client.issueAttachments.getAttachmentContent({ id: attachments[0].id });

  expect(Buffer.isBuffer(content)).toBeTruthy();
});

test.sequential('should remove attachment', async () => {
  await client.issues.deleteIssue({ issueIdOrKey: issue.key });
});
