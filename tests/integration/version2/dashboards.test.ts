import test from 'ava';
import { Constants } from '../constants.js';
import { getVersion2Client } from '../utils/index.js';
import { Version2Models } from '../../../src/index.js';

let dashboard: Version2Models.Dashboard;
const client = getVersion2Client();

test.serial('should create dashboard', async t => {
  dashboard = await client.dashboards.createDashboard({
    name: Constants.testDashboardName,
    sharePermissions: [],
  });

  t.truthy(!!dashboard);
  t.is(dashboard.name, Constants.testDashboardName);
  t.deepEqual(dashboard.sharePermissions, []);
});

test.serial('should remove dashboard', async t => {
  const response = await client.dashboards.deleteDashboard({
    id: dashboard.id,
  });

  t.is(typeof response, 'string');
  t.is<string | void, string>(response, '');
});
