import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils';

const client = getVersion3Client();

test.before(async (t) => {
  await prepareEnvironment();

  t.pass();
});

test.after(async (t) => {
  await cleanupEnvironment();

  t.pass();
});

test.serial('should get project roles', async (t) => {
  const projectRoles = await client.projectRoles.getProjectRoles({
    projectIdOrKey: Constants.testProjectKey,
  });

  t.truthy(!!projectRoles.Administrators);
  t.is(typeof projectRoles.Administrators, 'string');
});
