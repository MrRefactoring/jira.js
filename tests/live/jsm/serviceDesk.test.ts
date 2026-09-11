import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { ServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import { serviceDesk } from './setup/client';
import type { Fixtures } from './setup/fixtures';

/**
 * The Service Desk half of the surface, which needs a Service Management licence the Assets half does not.
 *
 * Assets ships with the image and its REST module does not check for a seat, so a Jira Software timebomb opens it
 * completely while every `/rest/servicedeskapi/` endpoint answers 403 with an HTML page. These tests therefore stand
 * down, visibly, when the global setup found the product unlicensed — the shape `tests/live/setup/entitlement.ts`
 * established for the Cloud suites, and for the same reason: a suite that fails over a licence buries the signal it
 * exists to carry.
 *
 * They come back the moment a Service Management Data Center timebomb is put in `docker/jsm-dc/timebomb-license.txt`,
 * without an edit here.
 */
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
