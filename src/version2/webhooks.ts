import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Webhooks {
  constructor(private client: Client) {
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the webhooks registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters: Parameters.GetDynamicWebhooksForApp | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the webhooks registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: never): Promise<T>;
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.webhooks.getDynamicWebhooksForApp' });
  }

  /**
   * Registers webhooks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters: Parameters.RegisterDynamicWebhooks | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Registers webhooks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: never): Promise<T>;
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'POST',
      data: {
        webhooks: parameters?.webhooks,
        url: parameters?.url,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.webhooks.registerDynamicWebhooks' });
  }

  /**
   * Removes webhooks by ID. Only webhooks registered by the calling Connect app are removed. If webhooks created by other apps are specified, they are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async deleteWebhookById<T = unknown>(parameters: Parameters.DeleteWebhookById | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Removes webhooks by ID. Only webhooks registered by the calling Connect app are removed. If webhooks created by other apps are specified, they are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: never): Promise<T>;
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'DELETE',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.webhooks.deleteWebhookById' });
  }

  /**
   * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.
   *
   * After 72 hours the failure may no longer be returned by this operation.
   *
   * The oldest failure is returned first.
   *
   * This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on the list as the `failedAfter` value or use the URL provided in `next`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters: Parameters.GetFailedWebhooks | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.
   *
   * After 72 hours the failure may no longer be returned by this operation.
   *
   * The oldest failure is returned first.
   *
   * This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on the list as the `failedAfter` value or use the URL provided in `next`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: never): Promise<T>;
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook/failed',
      method: 'GET',
      params: {
        maxResults: parameters?.maxResults,
        after: parameters?.after,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.webhooks.getFailedWebhooks' });
  }

  /**
   * Webhooks registered through the REST API expire after 30 days. Call this resource periodically to keep them alive.
   *
   * Unrecognized webhook IDs (nonexistent or belonging to other apps) are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters: Parameters.RefreshWebhooks | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Webhooks registered through the REST API expire after 30 days. Call this resource periodically to keep them alive.
   *
   * Unrecognized webhook IDs (nonexistent or belonging to other apps) are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: never): Promise<T>;
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/webhook/refresh',
      method: 'PUT',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.webhooks.refreshWebhooks' });
  }
}
