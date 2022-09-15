import * as sinon from 'sinon';
import test from 'ava';
import { IssueResolutions, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: 'http://localhost', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueResolutions = new IssueResolutions(client);

test('getResolutions should calls without parameters', t => {
  issueResolutions.getResolutions();

  t.truthy(sendRequestStub.calledOnce);
});
