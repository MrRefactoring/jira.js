import { getVersion2Client } from './getClient';
import { Constants } from './constants';

export const createTestProject = async () => {
  const client = getVersion2Client();

  return client.projects.createProject({
    key: Constants.testProjectKey,
    name: Constants.testProjectName,
    leadAccountId: '5b6d7f20e6dba529eefdbad9',
    projectTypeKey: 'software',
  }).catch((error) => {
    console.error(error.response.data);
    throw error;
  });
};
