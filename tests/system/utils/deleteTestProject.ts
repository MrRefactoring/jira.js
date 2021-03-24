import { getVersion2Client } from './getClient';
import { Constants } from './constants';

export const deleteTestProject = async () => {
  const client = getVersion2Client();

  return client.projects.deleteProject({
    projectIdOrKey: Constants.testProjectKey,
  }).catch((error) => {
    console.error(error.response.data);
    throw error;
  });
};
