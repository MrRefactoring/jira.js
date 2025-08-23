import type { Client } from '../client';
import type { Request } from '../request';
import type { DeleteWebhookByIdParameters } from './parameters/deleteWebhookByIdParameters';
import type { GetDynamicWebhooksForAppParameters } from './parameters/getDynamicWebhooksForAppParameters';
import type { RegisterDynamicWebhooksParameters } from './parameters/registerDynamicWebhooksParameters';
import type { GetFailedWebhooksParameters } from './parameters/getFailedWebhooksParameters';
import type { RefreshWebhooksParameters } from './parameters/refreshWebhooksParameters';

export class Webhooks {
  constructor(private client: Client) {}
  /**
   * Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps
   * are specified, they are ignored. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   *   2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async deleteWebhookById(parameters: DeleteWebhookByIdParameters) {
    const request: Request = {
      url: '/rest/api/2/webhook',
      method: 'DELETE',
      body: {
        webhookIds: parameters.webhookIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * webhooks registered by the calling app. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   *   2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async getDynamicWebhooksForApp(parameters: GetDynamicWebhooksForAppParameters) {
    const request: Request = {
      url: '/rest/api/2/webhook',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Registers webhooks. *
   *
   * - **NOTE:** for non-public OAuth apps, webhooks are delivered only if there is a match between the app owner and the
   *   user who registered a dynamic webhook.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   *   2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async registerDynamicWebhooks(parameters: RegisterDynamicWebhooksParameters) {
    const request: Request = {
      url: '/rest/api/2/webhook',
      method: 'POST',
      body: {
        url: parameters.url,
        webhooks: parameters.webhooks,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of
   * retries. *
   *
   * - After 72 hours the failure may no longer be returned by this operation.
   * -
   * - The oldest failure is returned first.
   * -
   * - This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on
   *   the list as the `failedAfter` value or use the URL provided in `next`.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) can use this operation.
   */
  async getFailedWebhooks(parameters: GetFailedWebhooksParameters) {
    const request: Request = {
      url: '/rest/api/2/webhook/failed',
      method: 'GET',
      query: {
        maxResults: parameters.maxResults,
        after: parameters.after,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to
   * keep them alive. *
   *
   * - Unrecognized webhook IDs (those that are not found or belong to other apps) are ignored.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   *   2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async refreshWebhooks(parameters: RefreshWebhooksParameters) {
    const request: Request = {
      url: '/rest/api/2/webhook/refresh',
      method: 'PUT',
      body: {
        webhookIds: parameters.webhookIds,
      },
    };

    return this.client.sendRequest(request);
  }
}
