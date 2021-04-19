import {
  prepareEnvironment,
  cleanupEnvironment,
  getVersion2Client, Constants,
} from '../utils';

describe('Projects', () => {
  beforeAll(async () => {
    jest.setTimeout(10_000);
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it(`should search ${Constants.testProjectKey} project`, async () => {
    const client = getVersion2Client();

    const projects = await client.projects.searchProjects({
      query: Constants.testProjectKey,
    });

    expect(projects.total).toBe(1);
    expect(projects.isLast).toBeTruthy();

    const project = projects.values[0];

    expect(project.key).toBe(Constants.testProjectKey);
    expect(project.name).toBe(Constants.testProjectName);
  });
});
