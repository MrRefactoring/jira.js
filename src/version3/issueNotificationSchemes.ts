import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueNotificationSchemes {
  constructor(private client: Client) { }
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters?: Parameters.GetNotificationSchemes, callback?: Callback<T>): Promise<void>;
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters?: Parameters.GetNotificationSchemes, callback?: undefined): Promise<T>;
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters?: Parameters.GetNotificationSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/notificationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getNotificationScheme<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationScheme, callback: Callback<T>): Promise<void>;
  async getNotificationScheme<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationScheme, callback?: undefined): Promise<T>;
  async getNotificationScheme<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/notificationscheme/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
