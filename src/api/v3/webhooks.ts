import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  PageBeanWebhook as PageBeanWebhookResponse, ContainerForRegisteredWebhooks as ContainerForRegisteredWebhooksResponse, FailedWebhooks as FailedWebhooksResponse, WebhooksExpirationDate as WebhooksExpirationDateResponse,
} from '../../models/v3';

export class Webhooks {
  constructor(private readonly client: Client) { }

  async getDynamicWebhooksForApp(parameters?: {
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanWebhookResponse>): Promise<PageBeanWebhookResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/webhook',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async registerDynamicWebhooks(parameters?: any, callback?: Callback<ContainerForRegisteredWebhooksResponse>): Promise<ContainerForRegisteredWebhooksResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/webhook',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWebhookById(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/webhook',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFailedWebhooks(parameters?: {
    maxResults?: number;
    after?: number;
  }, callback?: Callback<FailedWebhooksResponse>): Promise<FailedWebhooksResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/webhook/failed',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async refreshWebhooks(parameters?: any, callback?: Callback<WebhooksExpirationDateResponse>): Promise<WebhooksExpirationDateResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/webhook/refresh',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
