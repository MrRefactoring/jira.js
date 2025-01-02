import { Constants } from '@tests/integration/constants';
import { getVersion3Client } from './getClient';

export const deleteAgileProject = async () => {
  const client = getVersion3Client();

  return client.projects.deleteProject({
    projectIdOrKey: Constants.testAgileProjectKey,
    enableUndo: false,
  });
};
