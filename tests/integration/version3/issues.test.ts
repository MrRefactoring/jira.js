import { describe, test } from 'vitest';
import type { Version3Models } from '@jirajs';
import { Constants } from '@tests/integration/constants';
import { getVersion3Client } from '@tests/integration/utils';

describe.sequential('Issues', () => {
  let createdIssue: Version3Models.CreatedIssue;
  const client = getVersion3Client();

  test.sequential('should create issue', async ({ expect }) => {
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

    expect(!!createdIssue).toBeTruthy();
    expect(!!createdIssue.id).toBeTruthy();
    expect(!!createdIssue.self).toBeTruthy();
    expect(createdIssue.key.startsWith(Constants.testProjectKey)).toBeTruthy();
  });

  test.sequential('should get issue', async ({ expect }) => {
    const issue = await client.issues.getIssue({ issueIdOrKey: createdIssue.id });

    expect(!!issue).toBeTruthy();

    expect(issue.fields.summary).toBe(Constants.testIssueSummary);
    expect(issue.fields.description).toStrictEqual({
      content: [
        {
          content: [
            {
              text: Constants.testIssueDescription,
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'doc',
      version: 1,
    });
    expect(issue.fields.status.name).toBe('To Do');
    expect(!!issue.fields.priority).toBeTruthy();
    expect(!!issue.fields.assignee).toBeTruthy();
    expect(!!issue.fields.timetracking).toBeTruthy();
    expect(!!issue.fields.issuetype).toBeTruthy();
    expect(!!issue.fields.watches).toBeTruthy();
    expect(!!issue.fields.created).toBeTruthy();
    expect(!!issue.fields.labels).toBeTruthy();
    expect(!!issue.fields.updated).toBeTruthy();
    expect(!!issue.fields.components).toBeTruthy();
    expect(!!issue.fields.attachment).toBeTruthy();
    expect(!!issue.fields.creator).toBeTruthy();
    expect(!!issue.fields.subtasks).toBeTruthy();
    expect(!!issue.fields.reporter).toBeTruthy();
    expect(!!issue.fields.comment).toBeTruthy();
    expect(!!issue.fields.votes).toBeTruthy();
    expect(!!issue.fields.worklog).toBeTruthy();
  });

  test.sequential('should update issue description', async ({ expect }) => {
    await client.issues.editIssue({
      issueIdOrKey: createdIssue.id,
      fields: {
        description: 'this is a new description',
      },
    });

    const issue = await client.issues.getIssue({ issueIdOrKey: createdIssue.id });

    expect(issue.fields.description).toStrictEqual({
      content: [
        {
          content: [
            {
              text: 'this is a new description',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'doc',
      version: 1,
    });
  });

  test.sequential.skip('should remove issue', async ({ expect }) => {
    const removedIssue = await client.issues.deleteIssue({ issueIdOrKey: createdIssue.id });

    expect(removedIssue).toBe('');
  });
});
