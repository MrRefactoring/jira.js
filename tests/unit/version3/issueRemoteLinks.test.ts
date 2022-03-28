import * as sinon from 'sinon';
import test from 'ava';
import { IssueRemoteLinks, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueRemoteLinks = new IssueRemoteLinks(client);

test('createOrUpdateRemoteIssueLink should accept following parameters', t => {
  issueRemoteLinks.createOrUpdateRemoteIssueLink({
    issueIdOrKey: 'issue.key',
    object: {
      url: 'http://localhost/',
      title: 'Title',
      icon: {},
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/issue.key/remotelink');
  t.deepEqual(callArgument.data, {
    object: {
      url: 'http://localhost/',
      title: 'Title',
      icon: {},
    },
    application: undefined,
    globalId: undefined,
    relationship: undefined,
  });
});
