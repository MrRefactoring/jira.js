import { ProjectVersions, Version3Client } from '../../src/version3';
import * as sinon from 'sinon';

describe('Version3 ProjectVersions', () => {
  const client = new Version3Client({ host: '' });
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

    expect(callArgument.url).toBe('/rest/api/3/project/StubProjectId/version');
    expect(callArgument.params).toEqual({
      maxResults: 50,
      orderBy: '-sequence',
    });
  });

  it('getVersionRelatedIssues should accept next parameters', () => {
    projectVersions.getVersionRelatedIssues({
      id: 'RelatedIssueId',
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/3/version/RelatedIssueId/relatedIssueCounts');
  });

  it('getProjectVersions should accept next parameters', () => {
    projectVersions.getProjectVersions({ projectIdOrKey: 'TEST' });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/3/project/TEST/versions');
  });
});
