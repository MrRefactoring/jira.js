import { test } from 'vitest';
import { Version3Models } from '../../../src/index.js';
import { Constants } from '../constants.js';
import { getVersion3Client } from '../utils/index.js';

let dashboard: Version3Models.Dashboard;
const client = getVersion3Client();

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
