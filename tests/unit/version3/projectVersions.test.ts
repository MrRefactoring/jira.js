import * as sinon from 'sinon';
import test from 'ava';
import { ProjectVersions, Version3Client } from '../../../src/version3';

const config = { host: 'http://localhost' };

test('should be defined', t => {
  t.truthy(!!ProjectVersions);
});

test('getProjectVersionsPaginated should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getProjectVersionsPaginated({
    projectIdOrKey: 'StubProjectId',
    maxResults: 50,
    orderBy: '-sequence',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/project/StubProjectId/version');
  t.deepEqual(callArgument.params, {
    maxResults: 50,
    orderBy: '-sequence',
    expand: undefined,
    query: undefined,
    startAt: undefined,
    status: undefined,
  });
});

test('getVersionRelatedIssues should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getVersionRelatedIssues({
    id: 'RelatedIssueId',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/version/RelatedIssueId/relatedIssueCounts');
});

test('getProjectVersions should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/project/TEST/versions');
});

test('createVersion should accept follow parameters', t => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.projectVersions.createVersion({
    projectId: 1455,
    name: 'testName',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
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
