import { AxiosError } from 'axios';
import { Constants } from '../constants.js';
import { getVersion2Client } from './getClient.js';

export const deleteSoftwareProject = async () => {
  const client = getVersion2Client();

  return client.projects
    .deleteProject({
      projectIdOrKey: Constants.testProjectKey,
      enableUndo: false,
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error);
      throw error;
    });
};
