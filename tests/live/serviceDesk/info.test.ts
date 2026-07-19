import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `info` and `servicedesk` APIs (`getInfo`, `getServiceDesks`,
 * `getServiceDeskById`, `getQueues`, `getRequestTypes`).
 *
 * The third surface, and the one whose availability is not a single yes or no. On this tenant the product *is*
 * installed — `getInfo` answers with a version — while every service-desk endpoint refuses with 403, because the
 * account holds no agent licence. Those are two different gates, and a suite that probed only the first would report
 * a licensing fact as a library defect.
 *
 * So the suite establishes reachability against the listing rather than against `getInfo`, and asserts the typed
 * refusal as a first-class outcome.
 */
describe('Jira Service Management — info and service desks (live)', () => {
  let serviceDesk: ServiceDeskClient;
  /** Whether the credentials can reach service-desk data, which is a licence question, not an install question. */
  let licensed = false;

  beforeAll(async () => {
    serviceDesk = createServiceDeskClient(getClient());

    licensed = await serviceDesk.servicedesk
      .getServiceDesks({ limit: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('reports the product version, which needs no agent licence', async () => {
    const info = await serviceDesk.info.getInfo();

    expect(typeof info.version).toBe('string');
    expect(info.platformVersion).toBeTruthy();
  });

  it('refuses service-desk data typed when the account holds no agent licence', async () => {
    if (licensed) return;

    const error = await serviceDesk.servicedesk.getServiceDesks({ limit: 1 }).catch((e: unknown) => e);

    // 403 with an empty body — the least informative refusal in the whole API.
    // Typing it is the only thing that makes it actionable, and it must not be
    // mistaken for "there are no service desks".
    expect(isForbiddenError(error)).toBe(true);
    expect((error as { status?: number }).status).toBe(403);
  });

  it('lists the service desks, each tied to a project', async () => {
    if (!licensed) return;

    const desks = await serviceDesk.servicedesk.getServiceDesks({ limit: 10 });

    expect(Array.isArray(desks.values)).toBe(true);
    expect(typeof desks.isLastPage).toBe('boolean');

    for (const desk of desks.values ?? []) {
      expect(desk.id).toBeTruthy();
      // Every service desk is a view onto a project — the id that the platform
      // API works with.
      expect(desk.projectId).toBeTruthy();
      expect(typeof desk.projectKey).toBe('string');
    }
  });

  it('pages with `start` and `limit` rather than startAt and maxResults', async () => {
    if (!licensed) return;

    const page = await serviceDesk.servicedesk.getServiceDesks({ limit: 1 });

    // The Service Management API uses different pagination names and a
    // different last-page flag from the platform API. Porting code between the
    // two surfaces without noticing is a reliable way to page forever.
    expect(page.limit).toBe(1);
    expect(page.values?.length).toBeLessThanOrEqual(1);
    expect(typeof page.isLastPage).toBe('boolean');
  });

  it('resolves a single service desk and its request types', async () => {
    if (!licensed) return;

    const desks = await serviceDesk.servicedesk.getServiceDesks({ limit: 1 });
    const first = desks.values?.[0];

    if (!first) return;

    const desk = await serviceDesk.servicedesk.getServiceDeskById({ serviceDeskId: String(first.id) });

    expect(desk.id).toBe(first.id);

    const requestTypes = await serviceDesk.servicedesk.getRequestTypes({ serviceDeskId: String(first.id) });

    expect(Array.isArray(requestTypes.values)).toBe(true);
  });

  it('surfaces an unknown service desk as a typed error', async () => {
    if (!licensed) return;

    const error = await serviceDesk.servicedesk
      .getServiceDeskById({ serviceDeskId: '99999999' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || (error as { status?: number }).status === 400).toBe(true);
  });
});
