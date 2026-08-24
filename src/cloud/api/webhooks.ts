import { PageWebhookSchema } from '../models/pageWebhook';
import type { Page } from '../models/page';
import type { Webhook } from '../models/webhook';
import {
  ContainerForRegisteredWebhooksSchema,
  type ContainerForRegisteredWebhooks,
} from '../models/containerForRegisteredWebhooks';
import { WebhooksExpirationDateSchema, type WebhooksExpirationDate } from '../models/webhooksExpirationDate';
import type { GetDynamicWebhooksForApp } from '../parameters/getDynamicWebhooksForApp';
import type { RegisterDynamicWebhooks } from '../parameters/registerDynamicWebhooks';
import type { DeleteWebhookById } from '../parameters/deleteWebhookById';
import type { RefreshWebhooks } from '../parameters/refreshWebhooks';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of the
 * webhooks registered by the calling app.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
 * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
 */
export async function getDynamicWebhooksForApp(
  client: Client,
  parameters?: GetDynamicWebhooksForApp,
  options?: RequestOptions,
): Promise<Page<Webhook>> {
  const config: SendRequestOptions<Page<Webhook>> = {
    url: '/rest/api/3/webhook',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageWebhookSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Registers webhooks.
 *
 * **NOTE:** for non-public OAuth apps, webhooks are delivered only if there is a match between the app owner and the
 * user who registered a dynamic webhook.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
 * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
 */
export async function registerDynamicWebhooks(
  client: Client,
  parameters: RegisterDynamicWebhooks,
  options?: RequestOptions,
): Promise<ContainerForRegisteredWebhooks> {
  const config: SendRequestOptions<ContainerForRegisteredWebhooks> = {
    url: '/rest/api/3/webhook',
    method: 'POST',
    body: {
      url: parameters.url,
      webhooks: parameters.webhooks,
    },
    schema: ContainerForRegisteredWebhooksSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps
 * are specified, they are ignored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
 * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
 */
export async function deleteWebhookById(
  client: Client,
  parameters: DeleteWebhookById,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/webhook',
    method: 'DELETE',
    body: {
      webhookIds: parameters.webhookIds,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to
 * keep them alive.
 *
 * Unrecognized webhook IDs (those that are not found or belong to other apps) are ignored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
 * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
 */
export async function refreshWebhooks(
  client: Client,
  parameters: RefreshWebhooks,
  options?: RequestOptions,
): Promise<WebhooksExpirationDate> {
  const config: SendRequestOptions<WebhooksExpirationDate> = {
    url: '/rest/api/3/webhook/refresh',
    method: 'PUT',
    body: {
      webhookIds: parameters.webhookIds,
    },
    schema: WebhooksExpirationDateSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
