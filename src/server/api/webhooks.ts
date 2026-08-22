import { WebhookSchema, type Webhook } from '../models/webhook';
import { WebhookStatisticsSchema, type WebhookStatistics } from '../models/webhookStatistics';
import {
  GetWebhookStatisticsSummarySchema,
  type GetWebhookStatisticsSummary,
} from '../models/getWebhookStatisticsSummary';
import type { GetWebhooks } from '../parameters/getWebhooks';
import type { CreateWebhook } from '../parameters/createWebhook';
import type { GetWebhook } from '../parameters/getWebhook';
import type { UpdateWebhook } from '../parameters/updateWebhook';
import type { DeleteWebhook } from '../parameters/deleteWebhook';
import type { GetWebhookStatistics } from '../parameters/getWebhookStatistics';
import type { GetWebhookStatisticsSummary as GetWebhookStatisticsSummaryParameters } from '../parameters/getWebhookStatisticsSummary';
import type { GetWebhookTransitions } from '../parameters/getWebhookTransitions';
import type { GetLatestWebhookInvocation } from '../parameters/getLatestWebhookInvocation';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns the webhooks registered in this instance. Requires administrator permission. */
export async function getWebhooks(
  client: Client,
  parameters?: GetWebhooks,
  options?: RequestOptions,
): Promise<Webhook[]> {
  const config: SendRequestOptions<Webhook[]> = {
    url: '/rest/jira-webhook/1.0/webhooks',
    method: 'GET',
    searchParams: {
      event: parameters?.event,
      statistics: parameters?.statistics,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: z.array(WebhookSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Registers a webhook. Requires administrator permission. */
export async function createWebhook(
  client: Client,
  parameters: CreateWebhook,
  options?: RequestOptions,
): Promise<Webhook> {
  const config: SendRequestOptions<Webhook> = {
    url: '/rest/jira-webhook/1.0/webhooks',
    method: 'POST',
    body: {
      name: parameters.name,
      url: parameters.url,
      events: parameters.events,
      filters: parameters.filters,
      excludeBody: parameters.excludeBody,
      configuration: parameters.configuration,
      sslVerificationRequired: parameters.sslVerificationRequired,
    },
    schema: WebhookSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a registered webhook. Requires administrator permission. */
export async function getWebhook(client: Client, parameters: GetWebhook, options?: RequestOptions): Promise<Webhook> {
  const config: SendRequestOptions<Webhook> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}`,
    method: 'GET',
    schema: WebhookSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Replaces a registered webhook. Requires administrator permission. */
export async function updateWebhook(
  client: Client,
  parameters: UpdateWebhook,
  options?: RequestOptions,
): Promise<Webhook> {
  const config: SendRequestOptions<Webhook> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}`,
    method: 'PUT',
    body: {
      name: parameters.name,
      url: parameters.url,
      events: parameters.events,
      filters: parameters.filters,
      excludeBody: parameters.excludeBody,
      configuration: parameters.configuration,
      sslVerificationRequired: parameters.sslVerificationRequired,
    },
    schema: WebhookSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Unregisters a webhook. Requires administrator permission. */
export async function deleteWebhook(
  client: Client,
  parameters: DeleteWebhook,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns how a webhook has been delivering. Requires administrator permission. */
export async function getWebhookStatistics(
  client: Client,
  parameters: GetWebhookStatistics,
  options?: RequestOptions,
): Promise<WebhookStatistics> {
  const config: SendRequestOptions<WebhookStatistics> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}/statistics`,
    method: 'GET',
    schema: WebhookStatisticsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the delivery statistics of a webhook, one entry per event it delivers. Requires administrator permission. */
export async function getWebhookStatisticsSummary(
  client: Client,
  parameters: GetWebhookStatisticsSummaryParameters,
  options?: RequestOptions,
): Promise<GetWebhookStatisticsSummary> {
  const config: SendRequestOptions<GetWebhookStatisticsSummary> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}/statistics/summary`,
    method: 'GET',
    schema: GetWebhookStatisticsSummarySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the transitions a webhook has been through. Requires administrator permission. The shape of an entry is not
 * described here: an instance that has never delivered a webhook answers with an empty list, and guessing what a
 * populated one holds would be worse than leaving it to the caller.
 */
export async function getWebhookTransitions(
  client: Client,
  parameters: GetWebhookTransitions,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}/transitions`,
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the most recent delivery of a webhook. Requires administrator permission. Until the webhook has been
 * delivered once Jira answers 204 and this resolves to `undefined`; the 204 is deliberately not declared, because
 * declaring it is what makes the whole call type as `void` and hides the body that does arrive.
 */
export async function getLatestWebhookInvocation(
  client: Client,
  parameters: GetLatestWebhookInvocation,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/jira-webhook/1.0/webhooks/${parameters.webhookId}/latest`,
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
