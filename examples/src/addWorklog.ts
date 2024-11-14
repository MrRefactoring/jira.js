import { Version3Client } from 'jira.js';
import { createIssue } from './utils/index.js';
import { apiToken, email, host } from './credentials.js';

async function addWorklog() {
  const client = new Version3Client({
    host,
    authentication: {
      basic: { email, apiToken },
    },
  });

  // Used to reduce the amount of code that is not directly related to creating a worklog
  const { id: issueIdOrKey } = await createIssue(client);

  // The main part responsible for creating the worklog
  const worklog = await client.issueWorklogs.addWorklog({
    issueIdOrKey, // Required
    comment: 'My first worklog', // Not requited
    timeSpentSeconds: 60, // Required one of `timeSpentSeconds` or `timeSpent`
  });

  console.log(`Worklog successfully added for Issue Id: ${worklog.issueId}`);
}

addWorklog().catch(e => {
  console.error(e);

  throw new Error(e.errorMessages.join(' '));
});
