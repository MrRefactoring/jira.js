import test from "ava";
import * as sinon from 'sinon';
import { Issues, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issues = new Issues(client);

test.afterEach(() => {
  issues = new Issues(client);
  sendRequestStub.reset();
});

test.serial('createIssue should accept next parameters', t => {
  issues.createIssue({
    fields: {
      summary: 'gg',
      project: {
        key: 'testProject',
      },
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
      issuetype: {
        id: 10004,
      },
      labels: ['test label'],
    },
  });
});

test.serial('editIssue should accept next parameters', t => {
  issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: 'desc',
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/issueId');
  t.deepEqual(callArgument.params, { notifyUsers: false });
  t.deepEqual(callArgument.data, { fields: { description: 'desc' } });
});

test.serial('doTransition should accept next parameters', t => {
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

  t.is(callArgument.url, '/rest/api/3/issue/idOrKey/transitions');
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

test.serial('deleteIssue should accept next parameters', t => {
  issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: 'true' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/issueKey');
  t.deepEqual(callArgument.params, { deleteSubtasks: 'true' });
});
