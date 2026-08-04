import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `webhooks` API (`getDynamicWebhooksForApp`, `registerDynamicWebhooks`, `deleteWebhookById`,
 * `refreshWebhooks`) and the neighbouring `dynamicModules` reads.
 *
 * These are app-only endpoints: they operate on the webhooks registered by a Connect or Forge app, identified by the
 * app's own credentials. A user token has no app to speak for, so every one of them refuses — and refuses with a
 * status that says almost nothing about why.
 *
 * That refusal is the whole suite. It is worth pinning because "webhooks" is a feature people reach for early, and
 * the failure gives no hint that the problem is the *kind* of credential rather than its permissions. Registering a
 * webhook would in any case be a standing configuration change that outlives the run.
 */
describe('Jira Cloud — webhooks and dynamic modules (live, app-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('refuses to list webhooks for user credentials', async () => {
    const error = await client.webhooks.getDynamicWebhooksForApp({ maxResults: 5 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('refuses registration the same way, before validating the payload', async () => {
    const error = await client.webhooks
      .registerDynamicWebhooks({
        url: 'https://example.com/hook',
        webhooks: [{ events: ['jira:issue_created'], jqlFilter: 'project = NOSUCHPROJECT' }],
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses deletion without an app context', async () => {
    const error = await client.webhooks.deleteWebhookById({ webhookIds: [99999999] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the expiry refresh without an app context', async () => {
    const error = await client.webhooks.refreshWebhooks({ webhookIds: [99999999] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the dynamic module reads too', async () => {
    const error = await client.dynamicModules.getModules().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('fails typed rather than hanging, which is the part the library owns', async () => {
    const error = await client.dynamicModules.removeModules({}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(typeof (error as { status?: number }).status).toBe('number');
  });
});
