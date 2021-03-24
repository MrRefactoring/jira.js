import * as sinon from 'sinon';
import { IssueFields, Version3Client } from '../../../src/version3';

describe('Version3 IssueFields', () => {
  const client = new Version3Client({ host: '' });
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
