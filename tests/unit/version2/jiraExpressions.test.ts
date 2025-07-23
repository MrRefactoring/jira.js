import * as sinon from 'sinon';
import { test } from 'vitest';
import { JiraExpressions, Version2Client } from '@jirajs/version2';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!JiraExpressions).toBeTruthy();
});

test('evaluateJiraExpressionUsingEnhancedSearch should calls without parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch({
    expression: '',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('evaluateJiraExpressionUsingEnhancedSearch should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch({
    expression: '{ key: issue.key, type: issue.issueType.name }',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.query).toStrictEqual({
    expand: undefined,
  });

  expect(callArgument.body).toStrictEqual({
    expression: '{ key: issue.key, type: issue.issueType.name }',
    context: undefined,
  });
});
