import { describe, test } from 'vitest';
import type { Version2Models } from '@jirajs';
import { Constants } from '@tests/integration/constants';
import { getVersion2Client } from '@tests/integration/utils';

describe.sequential('Dashboards', () => {
  let dashboard: Version2Models.Dashboard;
  const client = getVersion2Client();

  test.sequential('should create dashboard', async ({ expect }) => {
    dashboard = await client.dashboards.createDashboard({
      name: Constants.testDashboardName,
      sharePermissions: [],
    });

    expect(!!dashboard).toBeTruthy();
    expect(dashboard.name).toBe(Constants.testDashboardName);
    expect(dashboard.sharePermissions).toStrictEqual([]);
  });

  test.sequential('should remove dashboard', async ({ expect }) => {
    const response = await client.dashboards.deleteDashboard({
      id: dashboard.id,
    });

    expect(typeof response).toBe('string');
    expect(response).toBe('');
  });
});
