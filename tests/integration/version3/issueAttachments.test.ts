import * as fs from 'fs';
import {
  cleanupEnvironment,
  getVersion3Client,
  prepareEnvironment,
} from '../utils';
import { Constants } from '../constants';

describe('IssueAttachments', () => {
  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
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
          name: 'Task',
        },
      },
    });

    expect(issue).toBeDefined();

    const attachments = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
        filename: 'issueAttachments.test.ts',
        file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
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
