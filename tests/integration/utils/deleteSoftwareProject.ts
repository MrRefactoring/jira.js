import { Constants } from '../constants';
import { getVersion2Client } from './getClient';

export const deleteSoftwareProject = async () => {
  const client = getVersion2Client();

  return client.projects.deleteProject({
    projectIdOrKey: Constants.testProjectKey,
  }).catch((error) => {
    console.error(error.response.data);
    throw error;
  });
};
