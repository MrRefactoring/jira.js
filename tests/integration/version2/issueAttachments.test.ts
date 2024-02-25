import * as fs from 'fs';
import test from 'ava';
import { Constants } from '../constants';
import { Attachment, Issue } from '../../../src/version2/models';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

const client = getVersion2Client({ noCheckAtlassianToken: true });

let issue: Issue;
let attachments: Attachment[];

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should add attachment', async t => {
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

  t.truthy(!!issue);

  attachments = await client.issueAttachments.addAttachment({
    issueIdOrKey: issue.key,
    attachment: {
      filename: 'issueAttachments.test.ts',
      file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
    },
  });

  t.truthy(!!attachments);
  t.is(attachments[0].filename, 'issueAttachments.test.ts');
  t.is(attachments[0].mimeType, 'video/mp2t');
});

test.serial('should getAttachmentContent', async t => {
  const content = await client.issueAttachments.getAttachmentContent({ id: attachments[0].id });

  t.truthy(Buffer.isBuffer(content));
});

test.serial('should remove attachment', async t => {
  await client.issues.deleteIssue({
    issueIdOrKey: issue.key,
  });

  t.pass();
});
