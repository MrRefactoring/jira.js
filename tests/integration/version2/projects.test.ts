import { Constants } from '../constants';
import test from 'ava';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial(`should search ${Constants.testProjectKey} project`, async t => {
  const client = getVersion2Client();

  const projects = await client.projects.searchProjects({
    query: Constants.testProjectKey,
  });

  t.is(projects.total, 1);
  t.truthy(projects.isLast);

  const project = projects.values[0];

  t.is(project.key, Constants.testProjectKey);
  t.is(project.name, Constants.testProjectName);
});
