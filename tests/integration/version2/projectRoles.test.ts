import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

const client = getVersion2Client();

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
