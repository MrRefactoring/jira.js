import { afterAll, beforeAll, test } from 'vitest';
import { Constants } from '@tests/constants';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '@tests/utils';

const client = getVersion3Client();

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

test.sequential('should get project roles', async ({ expect }) => {
  const projectRoles = await client.projectRoles.getProjectRoles({
    projectIdOrKey: Constants.testProjectKey,
  });

  expect(!!projectRoles.Administrators).toBeTruthy();
  expect(typeof projectRoles.Administrators).toBe('string');
});
