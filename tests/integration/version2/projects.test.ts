import { describe, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { getVersion2Client } from '@tests/integration/utils';

describe.sequential('Projects', () => {
  test.sequential('should search all projects', async ({ expect }) => {
    const client = getVersion2Client();
    const projects = await client.projects.searchProjects();

    expect(projects.total).toBeGreaterThanOrEqual(1);
  });

  test.sequential(`should search ${Constants.testProjectKey} project`, async ({ expect }) => {
    const client = getVersion2Client();

    const projects = await client.projects.searchProjects({
      query: Constants.testProjectKey,
    });

    expect(projects.total).toBeGreaterThanOrEqual(1);
    expect(projects.isLast).toBeTruthy();

    const project = projects.values[0];

    expect(project.key).toBe(Constants.testProjectKey);
    expect(project.name).toBe(Constants.testProjectName);
  });
});
