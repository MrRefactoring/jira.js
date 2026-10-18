import { describe, expect, inject, it } from 'vitest';
import { serviceDesk } from './setup/client';
import { deskFixtures } from './serviceDeskHelpers';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desks and portals', () => {
  const api = serviceDesk();

  it('lists the service project and reads it back by id', async () => {
    const { serviceDeskId, projectKey } = deskFixtures();
    const listed = await api.serviceDesks.getServiceDesks({ limit: 50 });
    expect(listed.values).toContainEqual(expect.objectContaining({ id: serviceDeskId, projectKey }));
    const desk = await api.serviceDesks.getServiceDeskById({ serviceDeskId });
    expect(desk.projectKey).toBe(projectKey);
  });

  it('finds the project portal in the list and by project key and id', async () => {
    const { projectKey } = deskFixtures();
    const portal = await api.portals.getPortalByProjectKey({ projectKey });
    expect(portal.id).toBeTypeOf('number');
    const listed = await api.portals.getPortals({ limit: 50 });
    expect(listed.values).toContainEqual(expect.objectContaining({ id: portal.id }));
    const loaded = await api.portals.getPortal({ portalId: String(portal.id) });
    expect(loaded.id).toBe(portal.id);
    expect(loaded.name).toBe(portal.name);
  });
});
