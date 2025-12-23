import { afterAll, beforeAll, test } from 'vitest';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '@tests/integration/utils';

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

test.sequential('searchForIssuesUsingJqlEnhancedSearch should correctly calls', async ({ expect }) => {
  const client = getVersion3Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
    jql: 'assignee=currentuser()',
  });

  expect(issues.issues).toStrictEqual([]);
});
