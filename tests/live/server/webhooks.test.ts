import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { touch } from './setup/touch';
import { testName } from '../helpers/naming';

describe('webhooks', () => {
  const jira: ServerClient = connect();
  let webhookId: number | undefined;

  beforeAll(async () => {
    const created = await jira.webhooks.createWebhook({
      name: testName('hook'),
      url: 'https://example.com/jira-js/created',
      events: ['jira:issue_created'],
    });

    webhookId = created.id;
  });

  afterAll(async () => {
    const id = webhookId;

    if (id !== undefined) await touch(() => jira.webhooks.deleteWebhook({ webhookId: id }));
  });

  it('registers a webhook and reads it back', async () => {
    expect(webhookId, 'the webhook was never created').toBeDefined();

    const read = await jira.webhooks.getWebhook({ webhookId: webhookId! });

    expect(read.url).toBe('https://example.com/jira-js/created');
    expect(read.events).toContain('jira:issue_created');
    expect(read.id).toBe(webhookId);
  });

  it('replaces the webhook', async () => {
    const updated = await jira.webhooks.updateWebhook({
      webhookId: webhookId!,
      name: testName('hook2'),
      url: 'https://example.com/jira-js/updated',
      events: ['jira:issue_updated'],
      excludeBody: true,
    });

    expect(updated.url).toBe('https://example.com/jira-js/updated');
    expect(updated.events).toContain('jira:issue_updated');
  });

  it('lists webhooks, with and without their statistics', async () => {
    const plain = await jira.webhooks.getWebhooks({ limit: 50 });

    expect(plain.some(hook => hook.id === webhookId)).toBe(true);
    expect(plain.find(hook => hook.id === webhookId)?.statistics).toBeUndefined();

    const expanded = await jira.webhooks.getWebhooks({ limit: 50, statistics: true });

    expect(expanded.find(hook => hook.id === webhookId)?.statistics?.counts).toBeDefined();

    const byEvent = await jira.webhooks.getWebhooks({ event: 'jira:issue_updated', limit: 50 });

    expect(Array.isArray(byEvent)).toBe(true);
  });

  it('reports how the webhook has been delivering', async () => {
    const statistics = await jira.webhooks.getWebhookStatistics({ webhookId: webhookId! });

    expect(statistics.counts?.successes).toBe(0);
    expect(statistics.counts?.window?.duration).toBeGreaterThan(0);

    const summary = await jira.webhooks.getWebhookStatisticsSummary({ webhookId: webhookId! });

    expect(summary['jira:issue_updated']?.counts).toBeDefined();
  });

  it('answers for a webhook that has never been delivered', async () => {
    const transitions = await jira.webhooks.getWebhookTransitions({ webhookId: webhookId! });

    expect(Array.isArray(transitions)).toBe(true);

    const latest = await jira.webhooks.getLatestWebhookInvocation({ webhookId: webhookId! });

    expect(latest).toBeUndefined();
  });

  it('unregisters it', async () => {
    await jira.webhooks.deleteWebhook({ webhookId: webhookId! });

    const gone = await touch(() => jira.webhooks.getWebhook({ webhookId: webhookId! }));

    expect(gone).toBeUndefined();

    webhookId = undefined;
  });
});
