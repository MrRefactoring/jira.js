import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanNotificationScheme as PageBeanNotificationSchemeResponse, NotificationScheme as NotificationSchemeResponse } from '../../models/v3';

export class IssueNotificationSchemes {
  constructor(private readonly client: Client) { }

  async getNotificationSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    expand?: string;
  }, callback?: Callback<PageBeanNotificationSchemeResponse>): Promise<PageBeanNotificationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/notificationscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getNotificationScheme(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<NotificationSchemeResponse>): Promise<NotificationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/notificationscheme/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
