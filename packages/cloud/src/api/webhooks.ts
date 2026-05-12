import { PageWebhookSchema, type PageWebhook } from '#/models/pageWebhook';
import {
  ContainerForRegisteredWebhooksSchema,
  type ContainerForRegisteredWebhooks,
} from '#/models/containerForRegisteredWebhooks';
import { WebhooksExpirationDateSchema, type WebhooksExpirationDate } from '#/models/webhooksExpirationDate';
import { type GetDynamicWebhooksForApp } from '#/parameters/getDynamicWebhooksForApp';
import { type RegisterDynamicWebhooks } from '#/parameters/registerDynamicWebhooks';
import { type DeleteWebhookById } from '#/parameters/deleteWebhookById';
import { type RefreshWebhooks } from '#/parameters/refreshWebhooks';
import { type Client, type SendRequestOptions } from '@jira.js/base';

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
): Promise<PageWebhook> {
  const config: SendRequestOptions<PageWebhook> = {
    url: '/rest/api/3/webhook',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageWebhookSchema,
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
): Promise<ContainerForRegisteredWebhooks> {
  const config: SendRequestOptions<ContainerForRegisteredWebhooks> = {
    url: '/rest/api/3/webhook',
    method: 'POST',
    body: {
      url: parameters.url,
      webhooks: parameters.webhooks,
    },
    schema: ContainerForRegisteredWebhooksSchema,
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
export async function deleteWebhookById(client: Client, parameters: DeleteWebhookById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/webhook',
    method: 'DELETE',
    body: {
      webhookIds: parameters.webhookIds,
    },
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
export async function refreshWebhooks(client: Client, parameters: RefreshWebhooks): Promise<WebhooksExpirationDate> {
  const config: SendRequestOptions<WebhooksExpirationDate> = {
    url: '/rest/api/3/webhook/refresh',
    method: 'PUT',
    body: {
      webhookIds: parameters.webhookIds,
    },
    schema: WebhooksExpirationDateSchema,
  };

  return await client.sendRequest(config);
}
