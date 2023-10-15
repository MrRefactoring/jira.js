import { AxiosError } from 'axios';
import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should update comment', async t => {
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

  t.truthy(!!issue);

  const comment = await client.issueComments
    .addComment({
      issueIdOrKey: issue.key,
      comment: 'this is a comment',
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error);

      throw error;
    });

  t.truthy(!!comment);

  const updatedComment = await client.issueComments.updateComment({
    issueIdOrKey: issue.key,
    id: comment.id,
    comment: 'updated comment',
  });

  t.truthy(!!updatedComment);
  t.is(updatedComment.id, comment.id);

  await client.issues.deleteIssue({
    issueIdOrKey: issue.key,
  });
});
