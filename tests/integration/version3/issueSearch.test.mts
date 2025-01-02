import { afterAll, beforeAll, test } from 'vitest';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '@tests/integration/utils';

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

test.sequential('searchForIssuesUsingJql should correctly calls', async ({ expect }) => {
  const client = getVersion3Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentuser()',
  });

  expect(issues.startAt).toBe(0);
  expect(issues.maxResults).toBe(50);
  expect(issues.issues).toStrictEqual([]);
});
