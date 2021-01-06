import * as sinon from 'sinon';
import { AgileClient, Issue } from '../../src/agile';

describe('Agile Issue', () => {
  const client = new AgileClient({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issue = new Issue(client);

  afterEach(() => {
    issue = new Issue(client);
    sendRequestStub.reset();
  });

  it('getIssue should accept next parameters', () => {
    issue.getIssue({ issueIdOrKey: 'key' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/agile/1.0/issue/key');
  });
});
