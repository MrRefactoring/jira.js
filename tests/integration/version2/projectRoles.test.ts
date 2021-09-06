import { Constants } from '../constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

describe('ProjectRoles', () => {
  const client = getVersion2Client();

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
