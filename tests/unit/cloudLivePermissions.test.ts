import { describe, expect, it } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';
import { isAuthError, isSchemaMismatchError, isServerError } from '#/core';
import { hasCloudAdminPermission } from '../live/setup/permissions';

function client(body: unknown, status = 200) {
  return createCloudClient({
    host: 'https://example.atlassian.net',
    onSchemaMismatch: 'throw',
    fetch: async () => Response.json(body, { status }),
  });
}

describe('Cloud live admin prerequisites', () => {
  it.each([true, false])('uses the explicit permission value %s', async havePermission => {
    await expect(hasCloudAdminPermission(client({ permissions: { ADMINISTER: { havePermission } } }))).resolves.toBe(
      havePermission,
    );
  });

  it('fails when the permission response omits the decision', async () => {
    await expect(hasCloudAdminPermission(client({ permissions: { ADMINISTER: {} } }))).rejects.toThrow(
      'ADMINISTER.havePermission',
    );
  });

  it.each([
    [401, isAuthError],
    [503, isServerError],
  ] as const)('propagates HTTP %s instead of treating it as missing admin rights', async (status, predicate) => {
    await expect(hasCloudAdminPermission(client({}, status))).rejects.toSatisfy(predicate);
  });

  it('propagates schema failures instead of skipping the suite', async () => {
    await expect(
      hasCloudAdminPermission(client({ permissions: { ADMINISTER: { havePermission: 'yes' } } })),
    ).rejects.toSatisfy(isSchemaMismatchError);
  });
});
