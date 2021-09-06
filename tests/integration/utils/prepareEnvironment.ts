import { createSoftwareProject } from './createSoftwareProject';

export const prepareEnvironment = async () => {
  await createSoftwareProject();
};
