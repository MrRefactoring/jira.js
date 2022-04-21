import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Webhooks {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * webhooks registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async getDynamicWebhooksForApp<T = Models.PageWebhook>(
    parameters: Parameters.GetDynamicWebhooksForApp | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * webhooks registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async getDynamicWebhooksForApp<T = Models.PageWebhook>(
    parameters?: Parameters.GetDynamicWebhooksForApp,
    callback?: never
  ): Promise<T>;
  async getDynamicWebhooksForApp<T = Models.PageWebhook>(
    parameters?: Parameters.GetDynamicWebhooksForApp,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Registers webhooks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(
    parameters: Parameters.RegisterDynamicWebhooks | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Registers webhooks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(
    parameters?: Parameters.RegisterDynamicWebhooks,
    callback?: never
  ): Promise<T>;
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(
    parameters?: Parameters.RegisterDynamicWebhooks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'POST',
      data: {
        webhooks: parameters?.webhooks,
        url: parameters?.url,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps
   * are specified, they are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async deleteWebhookById<T = unknown>(
    parameters: Parameters.DeleteWebhookById | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps
   * are specified, they are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: never): Promise<T>;
  async deleteWebhookById<T = unknown>(
    parameters?: Parameters.DeleteWebhookById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'DELETE',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.
   *
   * After 72 hours the failure may no longer be returned by this operation.
   *
   * The oldest failure is returned first.
   *
   * This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on
   * the list as the `failedAfter` value or use the URL provided in `next`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) can use this operation.
   */
  async getFailedWebhooks<T = Models.FailedWebhooks>(
    parameters: Parameters.GetFailedWebhooks | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.
   *
   * After 72 hours the failure may no longer be returned by this operation.
   *
   * The oldest failure is returned first.
   *
   * This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on
   * the list as the `failedAfter` value or use the URL provided in `next`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) can use this operation.
   */
  async getFailedWebhooks<T = Models.FailedWebhooks>(
    parameters?: Parameters.GetFailedWebhooks,
    callback?: never
  ): Promise<T>;
  async getFailedWebhooks<T = Models.FailedWebhooks>(
    parameters?: Parameters.GetFailedWebhooks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook/failed',
      method: 'GET',
      params: {
        maxResults: parameters?.maxResults,
        after: parameters?.after,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to
   * keep them alive.
   *
   * Unrecognized webhook IDs (those that are not found or belong to other apps) are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(
    parameters: Parameters.RefreshWebhooks | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to
   * keep them alive.
   *
   * Unrecognized webhook IDs (those that are not found or belong to other apps) are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth
   * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.
   */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(
    parameters?: Parameters.RefreshWebhooks,
    callback?: never
  ): Promise<T>;
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(
    parameters?: Parameters.RefreshWebhooks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook/refresh',
      method: 'PUT',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
