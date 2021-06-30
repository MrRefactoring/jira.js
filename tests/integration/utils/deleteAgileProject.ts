import { getVersion3Client } from './getClient';
import { Constants } from '../constants';

export const deleteAgileProject = async () => {
  const client = getVersion3Client();

  return client.projects.deleteProject({
    projectIdOrKey: Constants.testAgileProjectKey,
  });
};
