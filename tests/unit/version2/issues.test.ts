import * as sinon from 'sinon';
import { Issues, Version2Client } from '../../../src/version2';

describe('Version2 Issues', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issues = new Issues(client);

  afterEach(() => {
    issues = new Issues(client);
    sendRequestStub.reset();
  });

  it('createIssue should accept next parameters', () => {
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

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({
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

  it('editIssue should accept next parameters', () => {
    issues.editIssue({
      issueIdOrKey: 'issueId',
      notifyUsers: false,
      fields: {
        description: 'desc',
      },
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/issue/issueId');
    expect(callArgument.params).toEqual({ notifyUsers: false });
    expect(callArgument.data).toEqual({ fields: { description: 'desc' } });
  });

  it('doTransition should accept next parameters', () => {
    issues.doTransition({
      issueIdOrKey: 'idOrKey',
      transition: {
        name: 'transition',
        id: '31',
        to: [{
          id: '41',
          name: 'new transition',
        }],
      },
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/issue/idOrKey/transitions');
    expect(callArgument.data).toEqual({
      transition: {
        name: 'transition',
        id: '31',
        to: [{
          id: '41',
          name: 'new transition',
        }],
      },
    });
  });

  it('deleteIssue should accept next parameters', () => {
    issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: 'true' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/issue/issueKey');
    expect(callArgument.params).toEqual({ deleteSubtasks: 'true' });
  });
});
