import type { AxiosError } from 'axios';
import { describe, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { getVersion2Client } from '@tests/integration/utils';

describe.sequential('IssueComments', () => {
  test.sequential('should update comment', async ({ expect }) => {
    const client = getVersion2Client({ noCheckAtlassianToken: true });

    const issue = await client.issues.createIssue({
      fields: {
        summary: 'Issue with comments',
        project: {
          key: Constants.testProjectKey,
        },
        issuetype: {
          name: 'Task',
        },
      },
    });

    expect(!!issue).toBeTruthy();

    const comment = await client.issueComments
      .addComment({
        issueIdOrKey: issue.key,
        comment: 'this is a comment',
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data ?? error);

        throw error;
      });

    expect(!!comment).toBeTruthy();

    const updatedComment = await client.issueComments.updateComment({
      issueIdOrKey: issue.key,
      id: comment.id!,
      comment: 'updated comment',
    });

    expect(!!updatedComment).toBeTruthy();
    expect(updatedComment.id).toBe(comment.id);
  });
});
