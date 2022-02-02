import test from "ava";
import * as sinon from 'sinon';
import { IssueResolutions, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueResolutions = new IssueResolutions(client);

test('getResolutions should calls without parameters', t => {
  issueResolutions.getResolutions();

  t.truthy(sendRequestStub.calledOnce);
});
