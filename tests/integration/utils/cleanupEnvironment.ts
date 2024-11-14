import { deleteSoftwareProject } from './deleteSoftwareProject.js';

export const cleanupEnvironment = async () => {
  await deleteSoftwareProject();
};
