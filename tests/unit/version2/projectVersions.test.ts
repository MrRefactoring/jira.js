import * as sinon from 'sinon';
import { ProjectVersions, Version2Client } from '../../../src/version2';

describe('Version2 ProjectVersions', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let projectVersions = new ProjectVersions(client);

  afterEach(() => {
    sendRequestStub.reset();
    projectVersions = new ProjectVersions(client);
  });

  it('should be defined', () => {
    expect(ProjectVersions).toBeDefined();
  });

  it('getProjectVersionsPaginated should accept next parameters', () => {
    projectVersions.getProjectVersionsPaginated({
      projectIdOrKey: 'StubProjectId',
      maxResults: 50,
      orderBy: '-sequence',
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/project/StubProjectId/version');
    expect(callArgument.params).toEqual({
      maxResults: 50,
      orderBy: '-sequence',
    });
  });

  it('getVersionRelatedIssues should accept next parameters', () => {
    projectVersions.getVersionRelatedIssues({ id: 'RelatedIssueId' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/version/RelatedIssueId/relatedIssueCounts');
  });

  it('getProjectVersions should accept next parameters', () => {
    projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/project/TEST/versions');
  });

  it('createVersion should accept next parameters', () => {
    projectVersions.createVersion({
      project: 'testProject',
      name: 'testName',
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({
      project: 'testProject',
      name: 'testName',
    });
  });

  it('deleteVersion should accept next parameters', () => {
    projectVersions.deleteVersion({ id: 'versionId' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/2/version/versionId');
  });
});
