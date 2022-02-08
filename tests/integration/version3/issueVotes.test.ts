import { CreatedIssue } from '../../../src/version3/models';
import {
  cleanupEnvironment,
  createIssue,
  getVersion3Client,
  prepareEnvironment,
} from '../utils';

describe('IssueVotes', () => {
  const client = getVersion3Client();
  let createdIssue: CreatedIssue;

  beforeAll(async () => {
    await prepareEnvironment();
    createdIssue = await createIssue();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should get zero votes on the issue', async () => {
    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(0);
    expect(hasVoted).toBeFalsy();
  });

  it('should add vote to issue', async () => {
    await client.issueVotes.addVote({ issueIdOrKey: createdIssue.key });

    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(1);
    expect(hasVoted).toBeTruthy();
  });

  it('should remove vote from issue', async () => {
    await client.issueVotes.removeVote({ issueIdOrKey: createdIssue.key });

    const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

    expect(votes).toBe(0);
    expect(hasVoted).toBeFalsy();
  });
});
