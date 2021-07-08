import {
  cleanupEnvironment, createIssue, getVersion2Client, prepareEnvironment,
} from '../utils';
import { Constants } from '../constants';
import { CreatedIssue } from '../../../src/version2/models';

describe('IssueVotes', () => {
  const client = getVersion2Client();
  let createdIssue: CreatedIssue;

  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
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
