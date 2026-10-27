import type { CloudClient } from '#/cloud/createCloudClient';

export async function hasCloudAdminPermission(client: CloudClient): Promise<boolean> {
  const result = await client.permissions.getMyPermissions({ permissions: ['ADMINISTER'] });
  const allowed = result.permissions?.ADMINISTER?.havePermission;

  if (typeof allowed !== 'boolean') throw new Error('Jira did not report ADMINISTER.havePermission');

  return allowed;
}
