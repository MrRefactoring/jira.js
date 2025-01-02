import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version2Client } from '@jirajs';
import { IssueVotes } from '@jirajs/version2';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueVote = new IssueVotes(client);

test("should contains 'Content-Type'", ({ expect }) => {
  issueVote.addVote({ issueIdOrKey: 'TEST-2' });

  expect(sendRequestStub.calledOnce).toBeTruthy();
  expect(
    sendRequestStub.lastCall.calledWith({
      url: '/rest/api/2/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ).toBeTruthy();
});
