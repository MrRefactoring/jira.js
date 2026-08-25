/**
 * The webhook endpoints, which are in this library on the strength of a WADL and a measurement.
 *
 * Nothing else in the surface rests on that: every other operation comes from Atlassian's own document. These nine
 * were written from the Jersey WADL a running instance serves — which describes the requests and says nothing about
 * the bodies — and from calling each one against Jira Data Center 10.3. That makes this suite the only evidence the
 * shapes are right, so it exercises every one of them rather than a sample.
 */
import { afterAll, describe, expect, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { touch } from './setup/touch';
import { testName } from '../helpers/naming';

describe('webhooks', () => {
  const jira: ServerClient = connect();
  let webhookId: number | undefined;

  afterAll(async () => {
    const id = webhookId;

    if (id !== undefined) await touch(() => jira.webhooks.deleteWebhook({ webhookId: id }));
  });

  it('registers a webhook and reads it back', async () => {
    const created = await jira.webhooks.createWebhook({
      name: testName('hook'),
      url: 'https://example.com/jira-js/created',
      events: ['jira:issue_created'],
    });

    webhookId = created.id;

    expect(created.url).toBe('https://example.com/jira-js/created');
    expect(created.events).toContain('jira:issue_created');

    const read = await jira.webhooks.getWebhook({ webhookId: created.id });

    expect(read.id).toBe(created.id);
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
