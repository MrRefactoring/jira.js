import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Webhooks {
  constructor(private readonly client: Sender) { }

  public async getDynamicWebhooksForApp(
    params?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async registerDynamicWebhooks(
    params: {
      webhooks: Array<any>;
      url: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'POST',
      data: {
        webhooks: params.webhooks,
        url: params.url,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWebhooksById(
    params: {
      webhookIds: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/webhook',
      method: 'DELETE',
      data: {
        webhookIds: params.webhookIds,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFailedWebhooks(
    params?: {
      maxResults?: number;
      after?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/webhook/failed',
      method: 'GET',
      params: {
        maxResults: params.maxResults,
        after: params.after,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async extendWebhookLife(
    params: {
      webhookIds: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/webhook/refresh',
      method: 'PUT',
      data: {
        webhookIds: params.webhookIds,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
