import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { ServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import { serviceDesk } from './setup/client';
import type { Fixtures } from './setup/fixtures';

describe('service desk', () => {
  let api: ServiceDeskServerClient;
  let fixtures: Fixtures;

  beforeAll(() => {
    api = serviceDesk();
    fixtures = inject('jsmFixtures');
  });

  it.runIf(inject('jsmFixtures').serviceDeskLicensed)('reports what the application is', async () => {
    const info = await api.info.getInfo();

    expect(info.isLicensedForUse).toBe(true);
  });

  it.skipIf(inject('jsmFixtures').serviceDeskLicensed)('is not licensed on this instance', () => {
    expect(fixtures.serviceDeskLicensed).toBe(false);
  });
});
