import { describe, it } from 'vitest';
import { getVersion3Client } from '@tests/integration/utils';
import { Constants } from '@tests/integration/constants';

describe.skip('IssueFields', () => {
  // Project is created in global setup
  // Note: This test needs to be updated to get project ID from the created project
  let projectId: number;

  it.sequential('should get project fields', async () => {
    const client = getVersion3Client();

    // Get project to retrieve its ID
    const projects = await client.projects.searchProjects({
      query: Constants.testProjectKey,
    });
    projectId = Number(projects.values[0]?.id) || 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fields = await client.issueFields.getProjectFields({
      projectId: [projectId],
      workTypeId: [10040],
    });
  });
});
