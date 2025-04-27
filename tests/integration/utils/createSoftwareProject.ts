import { AxiosError } from 'axios';
import { Constants } from '@tests/integration/constants';
import { getVersion2Client } from './getClient';

export const createSoftwareProject = async () => {
  const client = getVersion2Client();
  const currentUser = await client.myself.getCurrentUser();

  if (!currentUser.accountId) {
    throw new Error(
      'Couldn\'t get the current user\'s account ID',
      { cause: { currentUser } },
    );
  }

  return client.projects
    .createProject({
      key: Constants.testProjectKey,
      name: Constants.testProjectName,
      leadAccountId: currentUser.accountId,
      projectTypeKey: 'software',
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error);
      throw error;
    });
};
