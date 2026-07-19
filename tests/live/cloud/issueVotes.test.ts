import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueVotes` API (`getVotes`, `addVote`, `removeVote`).
 *
 * A full write cycle that is genuinely safe: votes live entirely inside a disposable fixture issue, and both halves of
 * the mutation are exercised, so the suite leaves nothing behind even before teardown runs.
 *
 * Worth recording, because it contradicts the documented Jira Server behaviour and the intuition that comes with it:
 * on Cloud the reporter *can* vote for their own issue. The fixture issue is reported by the authenticating account,
 * and the vote is accepted. Any caller carrying over a "reporters cannot vote" guard from Server is wrong here.
 */
describe('Jira Cloud — issueVotes (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('reports a fresh issue as having no votes', async () => {
    const votes = await client.issueVotes.getVotes({ issueIdOrKey: issue.key });

    expect(votes.votes).toBe(0);
    expect(votes.hasVoted).toBe(false);
    expect(votes.self).toMatch(/^https:\/\//);
  });

  it('accepts a vote from the issue reporter and makes it observable', async () => {
    await client.issueVotes.addVote({ issueIdOrKey: issue.key });

    const votes = await client.issueVotes.getVotes({ issueIdOrKey: issue.key });

    // Read-your-write, and both fields move together: the count is the total,
    // `hasVoted` is about the calling account specifically.
    expect(votes.votes).toBe(1);
    expect(votes.hasVoted).toBe(true);
  });

  it('treats a repeated vote as idempotent rather than cumulative', async () => {
    await client.issueVotes.addVote({ issueIdOrKey: issue.key });

    const votes = await client.issueVotes.getVotes({ issueIdOrKey: issue.key });

    // One account, one vote — a retrying caller cannot inflate the count.
    expect(votes.votes).toBe(1);
  });

  it('withdraws the vote and returns the count to zero', async () => {
    await client.issueVotes.removeVote({ issueIdOrKey: issue.key });

    const votes = await client.issueVotes.getVotes({ issueIdOrKey: issue.key });

    expect(votes.votes).toBe(0);
    expect(votes.hasVoted).toBe(false);
  });

  it('accepts removing a vote that is no longer there', async () => {
    // Idempotent on the way out too — worth pinning, because the symmetric guess
    // (that a second removal 404s) is wrong and would send callers hunting.
    await expect(client.issueVotes.removeVote({ issueIdOrKey: issue.key })).resolves.toBeUndefined();
  });

  it('surfaces a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueVotes
      .getVotes({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
