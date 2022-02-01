import test from "ava";
import * as sinon from 'sinon';
import { Issues, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issues = new Issues(client);

test.afterEach(() => {
  issues = new Issues(client);
  sendRequestStub.reset();
});

test('createIssue should accept next parameters', t => {
  issues.createIssue({
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
  });
});

test('editIssue should accept next parameters', t => {
  issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: 'desc',
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/issueId');
  t.deepEqual(callArgument.params, { notifyUsers: false });
  t.deepEqual(callArgument.data, { fields: { description: 'desc' } });
});

test('doTransition should accept next parameters', t => {
  issues.doTransition({
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
    transition: {
      name: 'transition',
      id: '31',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
  });
});

test('deleteIssue should accept next parameters', t => {
  issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: 'true' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/issueKey');
  t.deepEqual(callArgument.params, { deleteSubtasks: 'true' });
});
