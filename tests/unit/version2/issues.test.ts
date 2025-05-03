import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version2Client } from '@jirajs';

const config = { host: 'http://localhost' };

test('createIssue should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issues.createIssue({
    fields: {
      summary: 'My issue name',
      project: {
        key: 'TEST',
      },
      issuetype: {
        name: '10004',
      },
      labels: ['test label'],
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    fields: {
      summary: 'My issue name',
      project: {
        key: 'TEST',
      },
      issuetype: {
        name: '10004',
      },
      labels: ['test label'],
    },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('editIssue should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: 'desc',
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/2/issue/issueId');
  expect(callArgument.params).toStrictEqual({
    expand: undefined,
    notifyUsers: false,
    overrideEditableFlag: undefined,
    overrideScreenSecurity: undefined,
    returnIssue: undefined,
  });
  expect(callArgument.data).toStrictEqual({
    fields: { description: 'desc' },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('doTransition should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issues.doTransition({
    issueIdOrKey: 'idOrKey',
    transition: {
      name: 'transition',
      id: '31',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/2/issue/idOrKey/transitions');
  expect(callArgument.data).toStrictEqual({
    fields: undefined,
    historyMetadata: undefined,
    properties: undefined,
    transition: {
      name: 'transition',
      id: '31',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
    update: undefined,
  });
});

test('deleteIssue should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: true });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/2/issue/issueKey');
  expect(callArgument.params).toStrictEqual({ deleteSubtasks: true });
});
