import { prepareEnvironment } from '../utils/prepareEnvironment';
import { cleanupEnvironment } from '../utils/cleanupEnvironment';
import { getVersion3Client } from '../utils/getClient';

describe('System tests. IssueSearch', () => {
  beforeAll(async () => {
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('searchForIssuesUsingJql should correctly calls', async () => {
    const client = getVersion3Client({ noCheckAtlassianToken: true });

    const issues = await client.issueSearch.searchForIssuesUsingJql({
      jql: 'assignee=currentuser()',
    });

    expect(issues.startAt).toBe(0);
    expect(issues.maxResults).toBe(50);
    expect(issues.issues).toEqual([]);
  });
});
