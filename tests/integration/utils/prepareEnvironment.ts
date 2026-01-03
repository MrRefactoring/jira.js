import { createSoftwareProject } from './createSoftwareProject';

export const prepareEnvironment = async () => {
  const project = await createSoftwareProject();

  return { project };
};
