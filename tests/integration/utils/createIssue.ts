import { Constants } from '@tests/constants';
import { getVersion2Client } from './getClient';

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
