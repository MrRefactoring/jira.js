import test from 'ava';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils/index.js';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('searchForIssuesUsingJql should correctly calls', async t => {
  const client = getVersion2Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentuser()',
  });

  t.is(issues.startAt, 0);
  t.is(issues.maxResults, 50);
  t.deepEqual(issues.issues, []);
});
