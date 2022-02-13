import test from 'ava';
import {
  cleanupEnvironment,
  getVersion2Client,
  prepareEnvironment,
} from '../utils';

test.before(async (t) => {
  await prepareEnvironment();

  t.pass();
});

test.after(async (t) => {
  await cleanupEnvironment();

  t.pass();
});

test.serial('searchForIssuesUsingJql should correctly calls', async (t) => {
  const client = getVersion2Client({ noCheckAtlassianToken: true });

  const issues = await client.issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentuser()',
  });

  t.is(issues.startAt, 0);
  t.is(issues.maxResults, 50);
  t.deepEqual(issues.issues, []);
});
