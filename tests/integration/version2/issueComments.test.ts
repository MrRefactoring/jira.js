import {
  cleanupEnvironment,
  getVersion2Client,
  prepareEnvironment,
} from '../utils';
import { Constants } from '../constants';

describe('IssueAttachments', () => {
  beforeAll(async () => {
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should update comment', async () => {
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

    expect(issue).toBeDefined();

    const comment = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      body: 'this is a comment',
    });

    expect(comment).toBeDefined();

    const updatedComment = await client.issueComments.updateComment({
      issueIdOrKey: issue.key,
      id: comment.id,
      body: 'updated comment',
    });

    expect(updatedComment).toBeDefined();
    expect(updatedComment.id).toEqual(comment.id);

    await client.issues.deleteIssue({
      issueIdOrKey: issue.key,
    });
  });
});
