import {
  cleanupEnvironment,
  getVersion2Client,
  prepareEnvironment,
} from '../utils';
import { Constants } from '../constants';

describe('IssueSearch', () => {
  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('searchForIssuesUsingJql should correctly calls', async () => {
    const client = getVersion2Client({ noCheckAtlassianToken: true });

    const issues = await client.issueSearch.searchForIssuesUsingJql({
      jql: 'assignee=currentuser()',
    });

    expect(issues.startAt).toBe(0);
    expect(issues.maxResults).toBe(50);
    expect(issues.issues).toEqual([]);
  });
});
