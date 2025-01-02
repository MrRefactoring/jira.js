import { Version3Client } from 'jira.js';
import { createIssue } from './utils';
import { apiToken, email, host } from './credentials';

async function addFixVersion() {
  const client = new Version3Client({
    host,
    authentication: {
      basic: { email, apiToken },
    },
  });

  const { id: issueIdOrKey } = await createIssue(client);

  const fix = await client.issueProperties.setIssueProperty({
    issueIdOrKey,
    propertyKey: 'fixVersion',
    // @ts-ignore
    propertyValue: 'N/a',
  });

  console.log(fix);
}

addFixVersion().catch(e => {
  console.error(e);

  throw new Error(e.errorMessages?.join(' '));
});
