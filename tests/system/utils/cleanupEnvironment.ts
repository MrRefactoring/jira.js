import { deleteTestProject } from './deleteTestProject';

export const cleanupEnvironment = async () => {
  await deleteTestProject();
};
