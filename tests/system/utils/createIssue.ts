import { getVersion2Client } from './getClient';
import { Constants } from './constants';

export const createIssue = async () => {
  const client = getVersion2Client();

  return client.issues.createIssue({
    fields: {
      project: {
        key: Constants.testProjectKey,
      },
      summary: 'Test issue',
      issuetype: {
        name: 'Task',
      },
    },
  });
};
