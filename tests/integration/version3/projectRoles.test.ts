import test from 'ava';
import { Constants } from '../constants.js';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils/index.js';

const client = getVersion3Client();

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should get project roles', async t => {
  const projectRoles = await client.projectRoles.getProjectRoles({
    projectIdOrKey: Constants.testProjectKey,
  });

  t.truthy(!!projectRoles.Administrators);
  t.is(typeof projectRoles.Administrators, 'string');
});
