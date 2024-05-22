import { AxiosError } from 'axios';
import { Constants } from '../constants.js';
import { getVersion2Client } from './getClient.js';

export const createSoftwareProject = async () => {
  const client = getVersion2Client();

  return client.projects
    .createProject({
      key: Constants.testProjectKey,
      name: Constants.testProjectName,
      leadAccountId: '5b6d7f20e6dba529eefdbad9',
      projectTypeKey: 'software',
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error);
      throw error;
    });
};
