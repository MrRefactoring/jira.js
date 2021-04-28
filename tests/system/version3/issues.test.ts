import { Version3Models } from '../../../src';
import { Constants } from '../constants';
import {
  cleanupEnvironment,
  getVersion3Client,
  prepareEnvironment,
} from '../utils';

describe('Issues', () => {
  let createdIssue: Version3Models.CreatedIssue;
  const client = getVersion3Client();

  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should create issue', async () => {
    createdIssue = await client.issues.createIssue({
      fields: {
        summary: Constants.testIssueSummary,
        issuetype: {
          name: 'Task',
        },
        project: {
          key: Constants.testProjectKey,
        },
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Description',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    });

    expect(createdIssue).toBeDefined();
    expect(createdIssue.id).toBeDefined();
    expect(createdIssue.key).toBe(`${Constants.testProjectKey}-1`);
    expect(createdIssue.self).toBeDefined();
  });

  it('should remove issue', async () => {
    const removedIssue = await client.issues.deleteIssue({ issueIdOrKey: createdIssue.id });

    expect(removedIssue).toBe('');
  });
});
