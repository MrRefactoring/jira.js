import { deleteSoftwareProject } from './deleteSoftwareProject';

export const cleanupEnvironment = async () => {
  await deleteSoftwareProject();
};
