import * as sinon from 'sinon';
import { Version2Client } from '../../../src';
import { IssueVotes } from '../../../src/version2';

describe('Version2 IssueVote', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  const issueVote = new IssueVotes(client);

  it('should contains \'Content-Type\'', () => {
    issueVote.addVote({ issueIdOrKey: 'TEST-2' });

    expect(sendRequestStub.calledOnce).toBeTruthy();
    expect(sendRequestStub.lastCall.calledWith({
      url: '/rest/api/2/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })).toBeTruthy();
  });
});
