import test from "ava";
import * as sinon from 'sinon';
import { IssueResolutions, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issueResolutions = new IssueResolutions(client);

test('getResolutions should calls without parameters', t => {
  issueResolutions.getResolutions();

  t.truthy(sendRequestStub.calledOnce);
});
