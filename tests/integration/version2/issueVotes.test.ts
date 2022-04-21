import { CreatedIssue } from '../../../src/version2/models';
import test from 'ava';
import { cleanupEnvironment, createIssue, getVersion2Client, prepareEnvironment } from '../utils';

const client = getVersion2Client();
let createdIssue: CreatedIssue;

test.before(async () => {
  await prepareEnvironment();
  createdIssue = await createIssue();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should get zero votes on the issue', async t => {
  const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

  t.is(votes, 0);
  t.falsy(hasVoted);
});

test.serial('should add vote to issue', async t => {
  await client.issueVotes.addVote({ issueIdOrKey: createdIssue.key });

  const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

  t.is(votes, 1);
  t.truthy(hasVoted);
});

test.serial('should remove vote from issue', async t => {
  await client.issueVotes.removeVote({ issueIdOrKey: createdIssue.key });

  const { votes, hasVoted } = await client.issueVotes.getVotes({ issueIdOrKey: createdIssue.id });

  t.is(votes, 0);
  t.falsy(hasVoted);
});
