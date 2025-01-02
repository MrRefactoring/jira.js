import { Version3Client } from 'jira.js';
import type { Worklog } from 'jira.js/out/version3/models';
import { apiToken, email, host } from './credentials.js';
import { addWorklog, createIssue } from './utils/index.js';

async function getAllWorklogs() {
  const client = new Version3Client({
    host,
    authentication: {
      basic: { email, apiToken },
    },
  });

  // Used to reduce the amount of code that is not directly related to getting a worklogs
  const issue = await createIssue(client);

  // Let's add some worklogs
  await addWorklog(client, issue);
  await addWorklog(client, issue);
  await addWorklog(client, issue);

  // The main part responsible for getting the worklogs
  const worklogs: Worklog[] = [];

  let offset = 0;
  let total = 0;

  do {
    // eslint-disable-next-line no-await-in-loop
    const worklogsPaginated = await client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issue.key, startAt: offset });

    offset += worklogsPaginated.worklogs.length;
    total = worklogsPaginated.total;
    worklogs.push(...worklogsPaginated.worklogs);
  } while (offset < total);

  console.log(`Received ${worklogs.length} worklogs.`);
}

getAllWorklogs().catch(e => {
  console.error(e);

  throw new Error(e.errorMessages.join(' '));
});
