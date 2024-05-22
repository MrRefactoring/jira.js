import { Constants } from '../constants.js';
import { getVersion3Client } from './getClient.js';

export const deleteAgileProject = async () => {
  const client = getVersion3Client();

  return client.projects.deleteProject({
    projectIdOrKey: Constants.testAgileProjectKey,
    enableUndo: false,
  });
};
