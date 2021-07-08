import * as sinon from 'sinon';
import { Version3Client } from '../../../src';
import { IssueVotes } from '../../../src/version3';

describe('Version3 IssueVotes', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  const issueVote = new IssueVotes(client);

  it('should contains \'Content-Type\'', () => {
    issueVote.addVote({ issueIdOrKey: 'TEST-2' });

    expect(sendRequestStub.calledOnce).toBeTruthy();
    expect(sendRequestStub.lastCall.calledWith({
      url: '/rest/api/3/issue/TEST-2/votes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })).toBeTruthy();
  });
});
