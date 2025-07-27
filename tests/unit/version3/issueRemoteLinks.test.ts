import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueRemoteLinks, Version3Client } from '@jirajs/version3';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueRemoteLinks = new IssueRemoteLinks(client);

test('createOrUpdateRemoteIssueLink should accept following parameters', async ({ expect }) => {
  await issueRemoteLinks.createOrUpdateRemoteIssueLink({
    issueIdOrKey: 'issue.key',
    object: {
      url: 'http://localhost/',
      title: 'Title',
      icon: {},
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/issue/issue.key/remotelink');
  expect(callArgument.body).toStrictEqual({
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
