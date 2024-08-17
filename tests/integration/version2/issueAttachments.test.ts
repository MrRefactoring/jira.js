import * as fs from 'fs';
import { afterAll, beforeAll, test } from 'vitest';
import type { Attachment, Issue } from '@jirajs/version2/models';
import { Constants } from '@tests/constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '@tests/utils';

const client = getVersion2Client({ noCheckAtlassianToken: true });

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
      file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
    },
  });

  expect(!!attachments).toBeTruthy();
  expect(attachments[0].filename).toBe('issueAttachments.test.ts');
  expect(attachments[0].mimeType).toBe('video/mp2t');
});

test.sequential('should getAttachmentContent', async ({ expect }) => {
  const content = await client.issueAttachments.getAttachmentContent({ id: attachments[0].id });

  expect(Buffer.isBuffer(content)).toBeTruthy();
});

test.sequential('should remove attachment', async ({ expect }) => {
  await client.issues.deleteIssue({ issueIdOrKey: issue.key });
});
