import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Webhooks {
  constructor(private client: Client) { }
  async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters?: Parameters.GetDynamicWebhooksForApp, callback?: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters?: Parameters.RegisterDynamicWebhooks, callback?: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async deleteWebhookById<T = any>(parameters?: Parameters.DeleteWebhookById, callback?: Callback<T>): Promise<void>;
  async deleteWebhookById<T = any>(parameters?: Parameters.DeleteWebhookById, callback?: undefined): Promise<T>;
  async deleteWebhookById<T = any>(parameters?: Parameters.DeleteWebhookById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook',
      method: 'DELETE',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFailedWebhooks<T = Models.FailedWebhooks>(parameters?: Parameters.GetFailedWebhooks, callback?: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: Callback<T>): Promise<void>;
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: undefined): Promise<T>;
  async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters?: Parameters.RefreshWebhooks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/webhook/refresh',
      method: 'PUT',
      data: {
        webhookIds: parameters?.webhookIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
