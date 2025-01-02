import { AxiosError } from 'axios';
import { afterAll, beforeAll, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '@tests/integration/utils';

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

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
    id: comment.id,
    comment: 'updated comment',
  });

  expect(!!updatedComment).toBeTruthy();
  expect(updatedComment.id).toBe(comment.id);

  await client.issues.deleteIssue({
    issueIdOrKey: issue.key,
  });
});
