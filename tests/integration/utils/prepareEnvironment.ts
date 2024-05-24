import { createSoftwareProject } from './createSoftwareProject.js';

export const prepareEnvironment = async () => {
  await createSoftwareProject();
};
