import test from "ava";
import * as sinon from 'sinon';
import { IssueFields, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueFields = new IssueFields(client);

test('getFields should calls without parameters', t => {
  issueFields.getFields();

  t.truthy(sendRequestStub.calledOnce);
});
