import { describe, expect, inject, it } from 'vitest';
import { serviceDesk } from './setup/client';
import { deskFixtures } from './serviceDeskHelpers';
import { assetName } from './setup/naming';
import { isApiError } from '#/core';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desk organizations', () => {
  const api = serviceDesk();

  it('creates, reads and deletes an organization after removing its users and project', async () => {
    const { serviceDeskId, customerUsername } = deskFixtures();
    const name = assetName('organization');
    const organization = await api.organizations.createOrganization({ name });
    expect(organization.id).toMatch(/^\d+$/);
    const organizationId = organization.id!;
    try {
      const listed = await api.organizations.getOrganizations({ limit: 50 });
      expect(listed.values).toContainEqual(expect.objectContaining({ id: organizationId, name }));
      const read = await api.organizations.getOrganization({ organizationId });
      expect(read.name).toBe(name);
      await api.organizations.addUsersToOrganization({ organizationId, usernames: [customerUsername] });
      const users = await api.organizations.getUsersInOrganization({ organizationId });
      expect(users.values).toContainEqual(expect.objectContaining({ name: customerUsername }));
      await api.serviceDeskOrganizations.addOrganization({ serviceDeskId, organizationId: Number(organizationId) });
      const attached = await api.serviceDeskOrganizations.getServiceDeskOrganizations({ serviceDeskId });
      expect(attached.values).toContainEqual(expect.objectContaining({ id: organizationId }));
      await api.serviceDeskOrganizations.removeOrganization({ serviceDeskId, organizationId: Number(organizationId) });
      const detached = await api.serviceDeskOrganizations.getServiceDeskOrganizations({ serviceDeskId });
      expect(detached.values).not.toContainEqual(expect.objectContaining({ id: organizationId }));
      await api.organizations.removeUsersFromOrganization({ organizationId, usernames: [customerUsername] });
      const empty = await api.organizations.getUsersInOrganization({ organizationId });
      expect(empty.values).not.toContainEqual(expect.objectContaining({ name: customerUsername }));
    } finally {
      await api.organizations.deleteOrganization({ organizationId });
    }
    await expect(api.organizations.getOrganization({ organizationId })).rejects.toMatchObject({ status: 404 });
  });

  it('previews and removes an empty organization', async () => {
    const created = await api.organizations.createOrganization({ name: assetName('empty organization') });
    expect(created.id).toMatch(/^\d+$/);
    const organizationId = created.id!;
    try {
      const preview = await api.organizations.previewCleanUpOrganizations();
      expect(preview).toContainEqual(expect.objectContaining({ id: organizationId }));
      const deleted = await api.organizations.cleanUpOrganizations({});
      expect(deleted).toBeGreaterThanOrEqual(1);
      await expect(api.organizations.getOrganization({ organizationId })).rejects.toMatchObject({ status: 404 });
    } finally {
      await api.organizations.deleteOrganization({ organizationId }).catch(error => {
        if (!isApiError(error) || error.status !== 404) throw error;
      });
    }
  });
});
