import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client } from '../../../src';

const config = { host: 'http://localhost', newErrorHandling: true };

test('createIssue should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.createIssue({
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

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
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

test('editIssue should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: 'desc',
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/issueId');
  t.deepEqual(callArgument.params, {
    expand: undefined,
    notifyUsers: false,
    overrideEditableFlag: undefined,
    overrideScreenSecurity: undefined,
    returnIssue: undefined,
  });
  t.deepEqual(callArgument.data, {
    fields: { description: 'desc' },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('doTransition should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.doTransition({
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

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/idOrKey/transitions');
  t.deepEqual(callArgument.data, {
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

test('deleteIssue should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: 'true' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/issueKey');
  t.deepEqual(callArgument.params, { deleteSubtasks: 'true' });
});
