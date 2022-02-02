import test from "ava";
import * as sinon from 'sinon';
import { Version3Client } from '../../../src';
import { IssueVotes } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueVote = new IssueVotes(client);

test('should contains \'Content-Type\'', t => {
  issueVote.addVote({ issueIdOrKey: 'TEST-2' });

  t.truthy(sendRequestStub.calledOnce);
  t.truthy(sendRequestStub.lastCall.calledWith({
    url: '/rest/api/3/issue/TEST-2/votes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }));
});
