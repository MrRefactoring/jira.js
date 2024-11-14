import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueRemoteLinks, Version2Client } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueRemoteLinks = new IssueRemoteLinks(client);

test('createOrUpdateRemoteIssueLink should accept follow parameters', ({ expect }) => {
  issueRemoteLinks.createOrUpdateRemoteIssueLink({
    issueIdOrKey: 'issue.key',
    object: {
      url: 'http://localhost/',
      title: 'Title',
      icon: {},
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/2/issue/issue.key/remotelink');
  expect(callArgument.data).toStrictEqual({
    application: undefined,
    globalId: undefined,
    relationship: undefined,
    object: {
      url: 'http://localhost/',
      title: 'Title',
      icon: {},
    },
  });
});
