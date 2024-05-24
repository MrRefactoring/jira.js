import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '../../../src/index.js';
import { IssueVotes } from '../../../src/version3/index.js';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueVote = new IssueVotes(client);

test("should contains 'Content-Type'", ({ expect }) => {
  issueVote.addVote({ issueIdOrKey: 'TEST-2' });

  expect(sendRequestStub.calledOnce).toBeTruthy();
  expect(
    sendRequestStub.lastCall.calledWith({
      url: '/rest/api/3/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ).toBeTruthy();
});
