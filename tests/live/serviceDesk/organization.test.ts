import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `organization` and `customer` APIs.
 *
 * Both are gated behind an agent licence the test account does not hold — every service-desk endpoint on this tenant
 * answers 403 with an empty body, as the `info` suite establishes. Rather than skip into vacuity, this file asserts
 * the refusal is *typed* on each of the endpoints a caller would reach for, which is the part the library is
 * responsible for and the part that stays true whether or not a licence is ever added.
 *
 * The write halves would not be exercised even with a licence: creating an organization or a customer creates a real
 * identity on the tenant, and `revokePortalOnlyAccessForUser` removes someone's access to the portal.
 */
describe('Jira Service Management — organizations and customers (live)', () => {
  let serviceDesk: ServiceDeskClient;
  let licensed = false;

  beforeAll(async () => {
    serviceDesk = createServiceDeskClient(getClient());

    licensed = await serviceDesk.organization
      .getOrganizations({ limit: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('lists organizations, or refuses typed without an agent licence', async () => {
    const result = await serviceDesk.organization.getOrganizations({ limit: 5 }).catch((e: unknown) => e);

    if (!licensed) {
      expect(isForbiddenError(result)).toBe(true);

      return;
    }

    const page = result as Awaited<ReturnType<typeof serviceDesk.organization.getOrganizations>>;

    expect(Array.isArray(page.values)).toBe(true);
    expect(typeof page.isLastPage).toBe('boolean');

    for (const organization of page.values ?? []) {
      expect(organization.id).toBeTruthy();
      expect(typeof organization.name).toBe('string');
    }
  });

  it('pages with start and limit, as the rest of this surface does', async () => {
    if (!licensed) return;

    const page = await serviceDesk.organization.getOrganizations({ limit: 1 });

    expect(page.limit).toBe(1);
    expect(page.values?.length).toBeLessThanOrEqual(1);
  });

  it('refuses a single organization lookup typed as well', async () => {
    const error = await serviceDesk.organization.getOrganization({ organizationId: 99999999 }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });

  it('refuses the organization property reads typed', async () => {
    const error = await serviceDesk.organization.getPropertiesKeys({ organizationId: '99999999' }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });

  it('fails typed on the identity-creating writes, without ever completing one', async () => {
    const error = await serviceDesk.customer
      .createCustomer({ email: 'not-an-email', displayName: '' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('fails typed when removing an organization that does not exist', async () => {
    const error = await serviceDesk.organization.deleteOrganization({ organizationId: 99999999 }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });
});
