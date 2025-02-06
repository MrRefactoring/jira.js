import * as sinon from 'sinon';
import { test } from 'vitest';
import { JiraExpressions, Version3Client } from '@jirajs/version3';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!JiraExpressions).toBeTruthy();
});

test('evaluateJiraExpressionUsingEnhancedSearch should calls without parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('evaluateJiraExpressionUsingEnhancedSearch should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch({
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
