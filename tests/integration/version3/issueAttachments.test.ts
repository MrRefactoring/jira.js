import * as fs from 'fs';
import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should add attachment', async t => {
  const client = getVersion3Client({ noCheckAtlassianToken: true });

  const issue = await client.issues.createIssue({
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

  const attachments = await client.issueAttachments.addAttachment({
    issueIdOrKey: issue.key,
    attachment: {
      filename: 'issueAttachments.test.ts',
      file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
    },
  });

  t.truthy(!!attachments);
  t.is(attachments[0].filename, 'issueAttachments.test.ts');
  t.is(attachments[0].mimeType, 'video/mp2t');

  await client.issues.deleteIssue({
    issueIdOrKey: issue.key,
  });
});
