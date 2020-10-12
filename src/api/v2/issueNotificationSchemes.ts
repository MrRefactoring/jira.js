import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PageBeanNotificationScheme as PageBeanNotificationSchemeResponse, NotificationScheme as NotificationSchemeResponse } from '../../models/v2';

export class IssueNotificationSchemes {
  constructor(private readonly client: Client) { }

  async getNotificationSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    expand?: string;
  }, callback?: Callback<PageBeanNotificationSchemeResponse>): Promise<PageBeanNotificationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/notificationscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getNotificationScheme(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<NotificationSchemeResponse>): Promise<NotificationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/notificationscheme/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
