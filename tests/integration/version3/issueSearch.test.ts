import { describe, test } from 'vitest';
import { getVersion3Client } from '@tests/integration/utils';

describe.sequential('IssueSearch', () => {
  test.sequential('searchForIssuesUsingJqlEnhancedSearch should correctly calls', async ({ expect }) => {
    const client = getVersion3Client({ noCheckAtlassianToken: true });

    const issues = await client.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
      jql: 'assignee=currentuser()',
    });

    expect(issues).toBeDefined();
    expect(Array.isArray(issues.issues)).toBeTruthy();
  });
});
