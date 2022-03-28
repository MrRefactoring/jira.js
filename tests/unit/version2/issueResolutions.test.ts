import * as sinon from 'sinon';
import test from 'ava';
import { IssueResolutions, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issueResolutions = new IssueResolutions(client);

test('getResolutions should calls without parameters', t => {
  issueResolutions.getResolutions();

  t.truthy(sendRequestStub.calledOnce);
});
