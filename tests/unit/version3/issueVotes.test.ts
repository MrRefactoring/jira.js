import * as sinon from 'sinon';
import { IssueVotes } from '../../../src/version3';
import test from 'ava';
import { Version3Client } from '../../../src';

const client = new Version3Client({ host: '', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueVote = new IssueVotes(client);

test("should contains 'Content-Type'", t => {
  issueVote.addVote({ issueIdOrKey: 'TEST-2' });

  t.truthy(sendRequestStub.calledOnce);
  t.truthy(
    sendRequestStub.lastCall.calledWith({
      url: '/rest/api/3/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
});
