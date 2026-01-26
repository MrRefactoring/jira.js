import { describe, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { getVersion3Client } from '@tests/integration/utils';

describe.sequential('IssueComments', () => {
  test.sequential('should update comment', async ({ expect }) => {
    const client = getVersion3Client({ noCheckAtlassianToken: true });

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

    const comment = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      comment: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.',
                type: 'text',
              },
            ],
          },
        ],
      },
    });

    expect(!!comment).toBeTruthy();
    if (!comment.id) throw new Error('Comment ID is not defined');

    const updatedComment = await client.issueComments.updateComment({
      issueIdOrKey: issue.key,
      id: comment.id,
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'Lorem ipsum dolor sit',
                type: 'text',
              },
            ],
          },
        ],
      },
    });

    expect(!!updatedComment).toBeTruthy();
    expect(updatedComment.id).toBe(comment.id);
  });
});
