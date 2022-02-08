import { Constants } from '../constants';
import {
  cleanupEnvironment,
  getVersion3Client,
  prepareEnvironment,
} from '../utils';

describe('IssueAttachments', () => {
  beforeAll(async () => {
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should update comment', async () => {
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

    expect(issue).toBeDefined();

    const comment = await client.issueComments.addComment({
      issueIdOrKey: issue.key,
      body: {
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

    expect(comment).toBeDefined();

    const updatedComment = await client.issueComments.updateComment({
      issueIdOrKey: issue.key,
      id: comment.id!, // TODO
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

    expect(updatedComment).toBeDefined();
    expect(updatedComment.id).toEqual(comment.id);

    await client.issues.deleteIssue({
      issueIdOrKey: issue.key,
    });
  });
});
