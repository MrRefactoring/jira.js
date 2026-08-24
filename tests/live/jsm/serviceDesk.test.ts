import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { ServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import { serviceDesk } from './setup/client';

describe('service desk', () => {
  let api: ServiceDeskServerClient;

  beforeAll(() => {
    api = serviceDesk();
  });

  it.runIf(inject('jsmFixtures').serviceDeskLicensed)('reports what the application is', async () => {
    const info = await api.info.getInfo();

    expect(info.isLicensedForUse).toBe(true);
  });

  it.skipIf(inject('jsmFixtures').serviceDeskLicensed)('reports no licence, and refuses everything else', async () => {
    const info = await api.info.getInfo();

    expect(info.isLicensedForUse).not.toBe(true);

    await expect(api.serviceDesks.getServiceDesks()).rejects.toThrow();
  });
});
