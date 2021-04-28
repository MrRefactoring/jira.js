import { Constants } from '../constants';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils';

describe('ProjectRoles', () => {
  const client = getVersion3Client();

  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should get project roles', async () => {
    const projectRoles = await client.projectRoles.getProjectRoles({
      projectIdOrKey: Constants.testProjectKey,
    });

    expect(projectRoles.Administrators).toBeDefined();
    expect(typeof projectRoles.Administrators).toBe('string');
  });
});
