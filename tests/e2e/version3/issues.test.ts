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
                  text: Constants.testIssueDescription,
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

  it('should get issue', async () => {
    const issue = await client.issues.getIssue({ issueIdOrKey: createdIssue.id });

    expect(issue).toBeDefined();

    // Fields section
    expect(issue.fields.summary).toBe(Constants.testIssueSummary);
    expect(issue.fields.status).toBeDefined();
    expect(issue.fields.status.name).toBe('To Do');
    expect(issue.fields.priority).toBeDefined();
    expect(issue.fields.assignee).toBeDefined();
    expect(issue.fields.timetracking).toBeDefined();
    expect(issue.fields.issuetype).toBeDefined();
    expect(issue.fields.watches).toBeDefined();
    expect(issue.fields.created).toBeDefined();
    expect(issue.fields.labels).toBeDefined();
    expect(issue.fields.updated).toBeDefined();
    expect(issue.fields.components).toBeDefined();
    expect(issue.fields.attachment).toBeDefined();
    expect(issue.fields.creator).toBeDefined();
    expect(issue.fields.subtasks).toBeDefined();
    expect(issue.fields.reporter).toBeDefined();
    expect(issue.fields.comment).toBeDefined();
    expect(issue.fields.votes).toBeDefined();
    expect(issue.fields.worklog).toBeDefined();
    expect(issue.fields.description).toEqual({
      content: [{
        content: [{
          text: Constants.testIssueDescription,
          type: 'text',
        }],
        type: 'paragraph',
      }],
      type: 'doc',
      version: 1,
    });
  });

  it('should remove issue', async () => {
    const removedIssue = await client.issues.deleteIssue({ issueIdOrKey: createdIssue.id });

    expect(removedIssue).toBe('');
  });
});
