import { Constants } from '../constants';
import { getVersion3Client } from '../utils';
import test from 'ava';
import { Version3Models } from '../../../src';

let dashboard: Version3Models.Dashboard;
const client = getVersion3Client();

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
