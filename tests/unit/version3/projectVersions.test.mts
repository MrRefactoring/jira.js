import * as sinon from 'sinon';
import { test } from 'vitest';
import { ProjectVersions, Version3Client } from '@jirajs/version3';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!ProjectVersions).toBeTruthy();
});

test('getProjectVersionsPaginated should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getProjectVersionsPaginated({
    projectIdOrKey: 'StubProjectId',
    maxResults: 50,
    orderBy: '-sequence',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/project/StubProjectId/version');
  expect(callArgument.params).toStrictEqual({
    maxResults: 50,
    orderBy: '-sequence',
    expand: undefined,
    query: undefined,
    startAt: undefined,
    status: undefined,
  });
});

test('getVersionRelatedIssues should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getVersionRelatedIssues({
    id: 'RelatedIssueId',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/version/RelatedIssueId/relatedIssueCounts');
});

test('getProjectVersions should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/project/TEST/versions');
});

test('createVersion should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.createVersion({
    projectId: 1455,
    name: 'testName',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    archived: undefined,
    description: undefined,
    expand: undefined,
    id: undefined,
    issuesStatusForFixVersion: undefined,
    moveUnfixedIssuesTo: undefined,
    name: 'testName',
    operations: undefined,
    overdue: undefined,
    projectId: 1455,
    releaseDate: undefined,
    released: undefined,
    self: undefined,
    startDate: undefined,
    userReleaseDate: undefined,
    userStartDate: undefined,
  });
});
