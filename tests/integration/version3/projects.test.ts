import {
  prepareEnvironment,
  cleanupEnvironment,
  getVersion3Client,
} from '../utils';
import { Constants } from '../constants';

describe('Projects', () => {
  beforeAll(async () => {
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it(`should search ${Constants.testProjectKey} project`, async () => {
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
});
