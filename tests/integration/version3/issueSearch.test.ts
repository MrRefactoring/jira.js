import test from 'ava';
import {
  cleanupEnvironment,
  getVersion3Client,
  prepareEnvironment,
} from '../utils';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('searchForIssuesUsingJql should correctly calls', async (t) => {
  const client = getVersion3Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentuser()',
  });

  t.is(issues.startAt, 0);
  t.is(issues.maxResults, 50);
  t.deepEqual(issues.issues, []);
});
