import { Constants } from '../constants.js';
import { getVersion2Client } from './getClient.js';

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
