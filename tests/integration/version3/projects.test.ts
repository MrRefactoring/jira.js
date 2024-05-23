import { afterAll, beforeAll, test } from 'vitest';
import { Constants } from '../constants.js';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils/index.js';

beforeAll(async () => {
  await prepareEnvironment();
});

afterAll(async () => {
  await cleanupEnvironment();
});

test.sequential(`should search ${Constants.testProjectKey} project`, async ({ expect }) => {
  const client = getVersion3Client();

  const projects = await client.projects.searchProjects({
    query: Constants.testProjectKey,
  });

  expect(projects.total).toBe(1);
  expect(projects.isLast).toBeTruthy();

  const project = projects.values[0];

  expect(project.key).toBe(Constants.testProjectKey);
  expect(project.name).toBe(Constants.testProjectName);
});
