import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PageBeanNotificationScheme, NotificationScheme } from '../schemas';
export class IssueNotificationSchemes {
  constructor(private readonly client: Sender) {}

  public async getNotificationSchemesPaginated(
    params?: {
      startAt?: number;
      maxResults?: number;
      expand?: string;
    },
    callback?: Callback<PageBeanNotificationScheme>,
  ): Promise<PageBeanNotificationScheme> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/notificationscheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getNotificationScheme(
    params: {
      id: number;
      expand?: string;
    },
    callback?: Callback<NotificationScheme>,
  ): Promise<NotificationScheme> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/notificationscheme/${params.id}`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
