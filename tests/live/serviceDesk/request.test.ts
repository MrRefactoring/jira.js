import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `request` and `knowledgebase` APIs — the customer-facing half of the product.
 *
 * Every endpoint here is gated behind an agent licence the test account does not hold, so this file asserts the
 * shape of the refusal across the whole surface rather than skipping. Two things make that worth doing.
 *
 * First, the refusal is a 403 with an empty body — the least informative answer in any of the three surfaces — so
 * that it arrives *typed* is the only thing standing between a caller and a bare rejection they cannot classify.
 *
 * Second, several of these endpoints would be unsafe even with a licence: `createCustomerRequest` opens a real ticket
 * a support team would see, `createRequestComment` writes into a customer conversation, and
 * `performCustomerTransition` moves someone's request through their workflow.
 */
describe('Jira Service Management — customer requests and knowledge base (live)', () => {
  let serviceDesk: ServiceDeskClient;
  let licensed = false;

  beforeAll(async () => {
    serviceDesk = createServiceDeskClient(getClient());

    licensed = await serviceDesk.request
      .getCustomerRequests({ limit: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('lists customer requests, or refuses typed without an agent licence', async () => {
    const result = await serviceDesk.request.getCustomerRequests({ limit: 5 }).catch((e: unknown) => e);

    if (!licensed) {
      expect(isForbiddenError(result)).toBe(true);
      expect((result as { status?: number }).status).toBe(403);

      return;
    }

    const page = result as Awaited<ReturnType<typeof serviceDesk.request.getCustomerRequests>>;

    expect(Array.isArray(page.values)).toBe(true);
    expect(typeof page.isLastPage).toBe('boolean');

    for (const request of page.values ?? []) {
      expect(request.issueId).toBeTruthy();
      expect(typeof request.issueKey).toBe('string');
    }
  });

  it('refuses a single request lookup typed', async () => {
    const error = await serviceDesk.request
      .getCustomerRequestByIdOrKey({ issueIdOrKey: 'NOSUCH-1' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    // Licence or missing request — either way typed, which is the part the
    // library owns and the part that survives a licence being added.
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });

  it('refuses the comment reads typed', async () => {
    const error = await serviceDesk.request
      .getRequestComments({ issueIdOrKey: 'NOSUCH-1', limit: 5 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });

  it('refuses the SLA reads typed', async () => {
    const error = await serviceDesk.request
      .getSlaInformation({ issueIdOrKey: 'NOSUCH-1' })
      .catch((e: unknown) => e);

    // SLA data is the reason many people reach for this API at all, so its
    // failure mode is worth pinning even when unreachable.
    expect(error).toBeInstanceOf(Error);
    expect(isForbiddenError(error) || (error as { status?: number }).status === 404).toBe(true);
  });

  it('refuses the participant and subscription reads typed', async () => {
    const participants = await serviceDesk.request
      .getRequestParticipants({ issueIdOrKey: 'NOSUCH-1' })
      .catch((e: unknown) => e);

    const subscription = await serviceDesk.request
      .getSubscriptionStatus({ issueIdOrKey: 'NOSUCH-1' })
      .catch((e: unknown) => e);

    expect(participants).toBeInstanceOf(Error);
    expect(subscription).toBeInstanceOf(Error);
  });

  it('never opens a real ticket, and fails typed on the attempt', async () => {
    // Deliberately incomplete: no service desk and no request type, so the call
    // cannot succeed even with a licence. `createCustomerRequest` opens a
    // ticket a support team would see and respond to.
    const error = await serviceDesk.request
      .createCustomerRequest({ serviceDeskId: '99999999', requestTypeId: '99999999' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('searches the knowledge base, or refuses typed', async () => {
    const result = await serviceDesk.knowledgebase
      .getArticles({ query: 'jira.js live test', highlight: false, limit: 5 })
      .catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result) || (result as { status?: number }).status === 404).toBe(true);

      return;
    }

    const page = result as Awaited<ReturnType<typeof serviceDesk.knowledgebase.getArticles>>;

    // `query` and `highlight` are both required by the parameter type, unlike
    // most search endpoints where the query is optional.
    expect(Array.isArray(page.values)).toBe(true);
  });
});
