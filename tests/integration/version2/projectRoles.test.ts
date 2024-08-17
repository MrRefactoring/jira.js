import { afterAll, beforeAll, test } from 'vitest';
import { Constants } from '@tests/constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '@tests/utils';

const client = getVersion2Client();

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
