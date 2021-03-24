import * as sinon from 'sinon';
import { IssueSearch, Version3Client } from '../../../src/version3';

describe('Version3 IssueSearch', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueSearch = new IssueSearch(client);

  afterEach(() => {
    sendRequestStub.reset();
    issueSearch = new IssueSearch(client);
  });

  it('should be defined', () => {
    expect(IssueSearch).toBeDefined();
  });

  it('searchForIssuesUsingJql should calls without parameters', () => {
    issueSearch.searchForIssuesUsingJql();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });

  it('searchForIssuesUsingJql should accept next parameters', () => {
    issueSearch.searchForIssuesUsingJql({
      jql: 'id IN (TICKET_ID) ORDER BY key ASC',
      maxResults: 10,
      fields: ['key', 'summary'],
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.params).toEqual({
      jql: 'id IN (TICKET_ID) ORDER BY key ASC',
      maxResults: 10,
      fields: ['key', 'summary'],
    });
  });

  it('searchForIssuesUsingJqlPost should accept next parameters', () => {
    issueSearch.searchForIssuesUsingJqlPost({
      jql: 'test JQL',
      expand: ['changelog'],
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({
      jql: 'test JQL',
      expand: ['changelog'],
    });
  });
});
