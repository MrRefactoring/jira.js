import { afterAll, beforeAll, test } from 'vitest';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '@tests/utils';

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

test.sequential('searchForIssuesUsingJql should correctly calls', async ({ expect }) => {
  const client = getVersion2Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentuser()',
  });

  expect(issues.startAt).toBe(0);
  expect(issues.maxResults).toBe(50);
  expect(issues.issues).toStrictEqual([]);
});
