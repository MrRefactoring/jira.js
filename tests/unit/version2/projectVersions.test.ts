import * as sinon from 'sinon';
import test from 'ava';
import { ProjectVersions, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let projectVersions = new ProjectVersions(client);

test.afterEach(() => {
  sendRequestStub.reset();
  projectVersions = new ProjectVersions(client);
});

test('should be defined', t => {
  t.truthy(!!ProjectVersions);
});

test.serial('getProjectVersionsPaginated should accept follow parameters', t => {
  projectVersions.getProjectVersionsPaginated({
    projectIdOrKey: 'StubProjectId',
    maxResults: 50,
    orderBy: '-sequence',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/project/StubProjectId/version');
  t.deepEqual(callArgument.params, {
    maxResults: 50,
    orderBy: '-sequence',
    expand: undefined,
    query: undefined,
    startAt: undefined,
    status: undefined,
  });
});

test.serial('getVersionRelatedIssues should accept follow parameters', t => {
  projectVersions.getVersionRelatedIssues({ id: 'RelatedIssueId' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/version/RelatedIssueId/relatedIssueCounts');
});

test.serial('getProjectVersions should accept follow parameters', t => {
  projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/project/TEST/versions');
});

test.serial('createVersion should accept follow parameters', t => {
  projectVersions.createVersion({
    project: 'testProject',
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
    project: 'testProject',
    projectId: undefined,
    releaseDate: undefined,
    released: undefined,
    self: undefined,
    startDate: undefined,
    userReleaseDate: undefined,
    userStartDate: undefined,
  });
});

test.serial('deleteVersion should accept follow parameters', t => {
  projectVersions.deleteVersion({ id: 'versionId' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/version/versionId');
});
