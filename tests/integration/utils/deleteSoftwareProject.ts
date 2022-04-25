import { AxiosError } from 'axios';
import { Constants } from '../constants';
import { getVersion2Client } from './getClient';

export const deleteSoftwareProject = async () => {
  const client = getVersion2Client();

  return client.projects
    .deleteProject({
      projectIdOrKey: Constants.testProjectKey,
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error);
      throw error;
    });
};
