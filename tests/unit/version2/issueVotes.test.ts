import * as sinon from 'sinon';
import { IssueVotes } from '../../../src/version2';
import test from 'ava';
import { Version2Client } from '../../../src';

const client = new Version2Client({ host: '', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueVote = new IssueVotes(client);

test("should contains 'Content-Type'", t => {
  issueVote.addVote({ issueIdOrKey: 'TEST-2' });

  t.truthy(sendRequestStub.calledOnce);
  t.truthy(
    sendRequestStub.lastCall.calledWith({
      url: '/rest/api/2/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
});
