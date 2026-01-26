import { describe, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { getVersion3Client } from '@tests/integration/utils';

describe.sequential('ProjectRoles', () => {
  const client = getVersion3Client();

  test.sequential('should get project roles', async ({ expect }) => {
    const projectRoles = await client.projectRoles.getProjectRoles({
      projectIdOrKey: Constants.testProjectKey,
    });

    expect(!!projectRoles.Administrators).toBeTruthy();
    expect(typeof projectRoles.Administrators).toBe('string');
  });
});
