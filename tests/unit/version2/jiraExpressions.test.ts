import * as sinon from 'sinon';
import { test } from 'vitest';
import { JiraExpressions, Version2Client } from '@jirajs/version2';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!JiraExpressions).toBeTruthy();
});

test('evaluateJSISJiraExpression should calls without parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.jiraExpressions.evaluateJSISJiraExpression();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('evaluateJSISJiraExpression should accept follow parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.jiraExpressions.evaluateJSISJiraExpression({
    expression: '{ key: issue.key, type: issue.issueType.name }',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.params).toStrictEqual({
    expand: undefined,
  });

  expect(callArgument.data).toStrictEqual({
    expression: '{ key: issue.key, type: issue.issueType.name }',
    context: undefined,
  });
});
