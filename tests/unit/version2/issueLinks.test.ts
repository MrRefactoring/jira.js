import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueLinks, Version2Client } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueLinks = new IssueLinks(client);

test('linkIssues should calls without parameters', ({ expect }) => {
  issueLinks.linkIssues({
    type: {},
    inwardIssue: {},
    outwardIssue: {},
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    comment: undefined,
    inwardIssue: {},
    outwardIssue: {},
    type: {},
  });
});
