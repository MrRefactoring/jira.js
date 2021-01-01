import { IssueSearch, Version2Client } from '../../src/version2';
import * as sinon from 'sinon';

describe('Version2 IssueSearch', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  afterEach(() => {
    sendRequestStub.reset();
  });

  it('should be defined', () => {
    expect(IssueSearch).toBeDefined();
  });

  it('searchForIssuesUsingJql should calls without parameters', () => {
    const issueSearch = new IssueSearch(client);

    issueSearch.searchForIssuesUsingJql();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });

  it('searchForIssuesUsingJql should accept next parameters', () => {
    const issueSearch = new IssueSearch(client);

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
});
