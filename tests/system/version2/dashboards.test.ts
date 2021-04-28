import { Version2Models } from '../../../src';
import { Constants } from '../constants';
import { cleanupEnvironment, getVersion2Client, prepareEnvironment } from '../utils';

describe('Dashboards', () => {
  let dashboard: Version2Models.Dashboard;
  const client = getVersion2Client();

  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
    await prepareEnvironment();
  });

  afterAll(async () => {
    await cleanupEnvironment();
  });

  it('should create dashboard', async () => {
    dashboard = await client.dashboards.createDashboard({
      name: Constants.testDashboardName,
      sharePermissions: [],
    });

    expect(dashboard).toBeDefined();
    expect(dashboard.name).toBe(Constants.testDashboardName);
    expect(dashboard.sharePermissions).toEqual([]);
  });

  it('should remove dashboard', async () => {
    const response = await client.dashboards.deleteDashboard({
      id: dashboard.id,
    });

    expect(typeof response).toBe('string');
    expect(response).toBe('');
  });
});
