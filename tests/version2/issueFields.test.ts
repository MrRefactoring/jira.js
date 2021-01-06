import * as sinon from 'sinon';
import { IssueFields, Version2Client } from '../../src/version2';

describe('Version2 IssueFields', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueFields = new IssueFields(client);

  afterEach(() => {
    sendRequestStub.reset();
    issueFields = new IssueFields(client);
  });

  it('getFields should calls without parameters', () => {
    issueFields.getFields();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });
});
