import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should update comment', async t => {
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

  t.truthy(!!issue);

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

  t.truthy(!!comment);

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

  t.truthy(!!updatedComment);
  t.is(updatedComment.id, comment.id);

  await client.issues.deleteIssue({
    issueIdOrKey: issue.key,
  });
});
