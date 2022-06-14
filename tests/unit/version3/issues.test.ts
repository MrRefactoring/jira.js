import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

const config = { host: '', newErrorHandling: true };

test('createIssue should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.createIssue({
    fields: {
      summary: 'gg',
      project: {
        key: 'testProject',
      },
      description: 'hello',
      issuetype: {
        id: 10004,
      },
      labels: ['test label'],
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
    fields: {
      summary: 'gg',
      project: {
        key: 'testProject',
      },
      description: {
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'hello',
                type: 'text',
              },
            ],
          },
        ],
        type: 'doc',
        version: 1,
      },
      issuetype: {
        id: 10004,
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
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'desc',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/issueId');
  t.deepEqual(callArgument.params, {
    notifyUsers: false,
    overrideEditableFlag: undefined,
    overrideScreenSecurity: undefined,
  });
  t.deepEqual(callArgument.data, {
    fields: {
      description: {
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'desc',
                type: 'text',
              },
            ],
          },
        ],
        type: 'doc',
        version: 1,
      },
    },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('doTransition should accept follow parameters', t => {
  const client = new Version3Client(config);
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

  t.is(callArgument.url, '/rest/api/3/issue/idOrKey/transitions');
  t.deepEqual(callArgument.data, {
    fields: undefined,
    historyMetadata: undefined,
    properties: undefined,
    transition: {
      id: '31',
      name: 'transition',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
    update: undefined,
  });
});

test('deleteIssue should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: 'true' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/issueKey');
  t.deepEqual(callArgument.params, { deleteSubtasks: 'true' });
});
