import { describe, expect, inject, it } from 'vitest';
import { serviceDesk } from './setup/client';
import { deskFixtures } from './serviceDeskHelpers';
import { assetName } from './setup/naming';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desk request types', () => {
  const api = serviceDesk();

  it('lists template request types and their groups and form fields', async () => {
    const { serviceDeskId, requestTypeId } = deskFixtures();
    const types = await api.requestTypes.getRequestTypes({ serviceDeskId });
    expect(types.values).toContainEqual(expect.objectContaining({ id: requestTypeId }));
    const groups = await api.requestTypes.getRequestTypeGroups({ serviceDeskId });
    expect(groups.values?.length).toBeGreaterThan(0);
    const fields = await api.requestTypes.getRequestTypeFields({ serviceDeskId, requestTypeId });
    expect(fields.requestTypeFields).toContainEqual(expect.objectContaining({ fieldId: 'summary', required: true }));
  });

  it('creates, reads, restricts, updates and deletes a request type', async () => {
    const { serviceDeskId, issueTypeId, customerKey } = deskFixtures();
    const created = await api.requestTypes.createRequestType({
      serviceDeskId,
      issueTypeId,
      name: assetName('request type'),
    });
    expect(created.id).toMatch(/^\d+$/);
    const requestTypeId = created.id!;
    try {
      const loaded = await api.requestTypes.getRequestTypeById({ serviceDeskId, requestTypeId });
      expect(loaded.name).toBe(created.name);
      const permissions = await api.requestTypePermissions.getPermissionsByRequestTypeId({
        serviceDeskId,
        requestTypeId,
      });
      expect(permissions.id).toBe(requestTypeId);
      const rewritten = await api.requestTypePermissions.upsertRequestTypePermission({
        serviceDeskId,
        requestTypeId,
        allowlist: [{ entityType: 'USER', entityId: customerKey }],
      });
      expect(rewritten.id).toBe(requestTypeId);
      const restricted = await api.requestTypePermissions.getPermissionsByRequestTypeId({
        serviceDeskId,
        requestTypeId,
      });
      expect(restricted.permissions).toContainEqual(
        expect.objectContaining({ entityType: 'USER', entityId: customerKey }),
      );
      const name = assetName('renamed request type');
      const updated = await api.requestTypes.updateRequestType({
        serviceDeskId,
        requestTypeId: Number(requestTypeId),
        name,
      });
      expect(updated.name).toBe(name);
      const read = await api.requestTypes.getRequestTypeById({ serviceDeskId, requestTypeId });
      expect(read.name).toBe(name);
    } finally {
      await api.requestTypes.deleteRequestType({ serviceDeskId, requestTypeId });
    }
    await expect(api.requestTypes.getRequestTypeById({ serviceDeskId, requestTypeId })).rejects.toMatchObject({
      status: 404,
    });
  });
});
