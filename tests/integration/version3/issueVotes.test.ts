import { beforeAll, describe, test } from 'vitest';
import type { CreatedIssue } from '@jirajs/version3/models';
import {
  createIssue,
  getVersion3Client,
} from '@tests/integration/utils';

describe.sequential('IssueVotes', () => {
  const client = getVersion3Client();
  let createdIssue: CreatedIssue;

  beforeAll(async () => {
    createdIssue = await createIssue();
  });

  test.sequential('should get zero votes on the issue', async ({ expect }) => {
    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(0);
    expect(hasVoted).toBeFalsy();
  });

  test.sequential('should add vote to issue', async ({ expect }) => {
    await client.issueVotes.addVote({ issueIdOrKey: createdIssue.key });

    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(1);
    expect(hasVoted).toBeTruthy();
  });

  test.sequential('should remove vote from issue', async ({ expect }) => {
    await client.issueVotes.removeVote({ issueIdOrKey: createdIssue.key });

    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(0);
    expect(hasVoted).toBeFalsy();
  });
});
