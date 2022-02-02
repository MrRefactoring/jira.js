import * as sinon from 'sinon';
import test from 'ava';
import { IssueFields, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueFields = new IssueFields(client);

test('getFields should calls without parameters', t => {
  issueFields.getFields();

  t.truthy(sendRequestStub.calledOnce);
});
