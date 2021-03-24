import * as fs from 'fs';
import { prepareEnvironment } from '../utils/prepareEnvironment';
import { cleanupEnvironment } from '../utils/cleanupEnvironment';
import { getVersion3Client } from '../utils/getClient';
import { Constants } from '../utils/constants';

describe('System tests. IssueAttachments', () => {
  beforeAll(async () => {
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should add attachment', async () => {
    const client = getVersion3Client({ noCheckAtlassianToken: true });

    const issue = await client.issues.createIssue({
      fields: {
        summary: 'Issue with attachment',
        project: {
          key: Constants.testProjectKey,
        },
        issuetype: {
          id: 10004,
        },
      },
    });

    expect(issue).toBeDefined();

    const attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'issueAttachments.test.ts',
        file: fs.readFileSync('./tests/system/version2/issueAttachments.test.ts'),
      },
    });

    expect(attachments).toBeDefined();
    expect(attachments[0].filename).toBe('issueAttachments.test.ts');
    expect(attachments[0].mimeType).toBe('video/mp2t');

    await client.issues.deleteIssue({
      issueIdOrKey: issue.key,
    });
  });
});
