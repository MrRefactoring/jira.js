import { Version3Client, Version3Models } from 'jira.js';

export const addWorklog = async (client: Version3Client, issue: Version3Models.Issue) => {
  await client.issueWorklogs.addWorklog({
    issueIdOrKey: issue.id,
    comment: 'My first worklog',
    timeSpentSeconds: 60,
  });
};
