import { Version3Models } from '../../../src';
import { Constants } from '../constants';
import { getVersion3Client } from '../utils';

describe('Dashboards', () => {
  let dashboard: Version3Models.Dashboard;
  const client = getVersion3Client();

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
