import { afterAll, beforeAll, describe, it } from 'vitest';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '@tests/integration/utils';

describe.skip('IssueFields', () => {
  let projectId: number;

  beforeAll(async () => {
    const { project } = await prepareEnvironment();

    projectId = project.id;
  });

  afterAll(cleanupEnvironment);

  it.sequential('should get project fields', async () => {
    const client = getVersion3Client();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fields = await client.issueFields.getProjectFields({
      projectId: [projectId],
      workTypeId: [10040],
    });
  });
});
