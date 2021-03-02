import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Webhooks {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of the webhooks registered by the calling app.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of the webhooks registered by the calling app.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: undefined): Promise<T>;
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getDynamicWebhooksForApp' });
  }
  /**
     * Registers webhooks.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: Callback<T>): Promise<void>;
  /**
     * Registers webhooks.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: undefined): Promise<T>;
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook',
      method: 'POST',
      data: {
        webhooks: parameters?.webhooks,
        url: parameters?.url,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'registerDynamicWebhooks' });
  }
  /**
     * Removes webhooks by ID. Only webhooks registered by the calling Connect app are removed. If webhooks created by other apps are specified, they are ignored.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: Callback<T>): Promise<void>;
  /**
     * Removes webhooks by ID. Only webhooks registered by the calling Connect app are removed. If webhooks created by other apps are specified, they are ignored.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: undefined): Promise<T>;
  async deleteWebhookById<T = unknown>(parameters?: Parameters.DeleteWebhookById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook',
      method: 'DELETE',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteWebhookById' });
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
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: Callback<T>): Promise<void>;
  /**
     * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.
     *
     * After 72 hours the failure may no longer be returned by this operation.
     *
     * The oldest failure is returned first.
     *
     * This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on the list as the `failedAfter` value or use the URL provided in `next`.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: undefined): Promise<T>;
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook/failed',
      method: 'GET',
      params: {
        maxResults: parameters?.maxResults,
        after: parameters?.after,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getFailedWebhooks' });
  }
  /**
     * Webhooks registered through the REST API expire after 30 days. Call this resource periodically to keep them alive.
     *
     * Unrecognized webhook IDs (nonexistent or belonging to other apps) are ignored.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: Callback<T>): Promise<void>;
  /**
     * Webhooks registered through the REST API expire after 30 days. Call this resource periodically to keep them alive.
     *
     * Unrecognized webhook IDs (nonexistent or belonging to other apps) are ignored.
     *
     * **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation. */
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: undefined): Promise<T>;
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook/refresh',
      method: 'PUT',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'refreshWebhooks' });
  }
}
