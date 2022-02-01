import test from "ava";
import * as sinon from 'sinon';
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

test('getProjectVersionsPaginated should accept next parameters', t => {
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
  });
});

test('getVersionRelatedIssues should accept next parameters', t => {
  projectVersions.getVersionRelatedIssues({ id: 'RelatedIssueId' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/version/RelatedIssueId/relatedIssueCounts');
});

test('getProjectVersions should accept next parameters', t => {
  projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/project/TEST/versions');
});

test('createVersion should accept next parameters', t => {
  projectVersions.createVersion({
    project: 'testProject',
    name: 'testName',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
    project: 'testProject',
    name: 'testName',
  });
});

test('deleteVersion should accept next parameters', t => {
  projectVersions.deleteVersion({ id: 'versionId' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/version/versionId');
});
