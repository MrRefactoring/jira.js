import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueNotificationSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
   *
   * _Note that you should allow for events without recipients to appear in responses._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters: Parameters.GetNotificationSchemes | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
   *
   * _Note that you should allow for events without recipients to appear in responses._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: never
  ): Promise<T>;
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/notificationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        projectId: parameters?.projectId,
        onlyDefault: parameters?.onlyDefault,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of
   *   events and the recipients who will receive notifications for those events. Deprecated, use [Get notification
   *   schemes paginated](#api-rest-api-3-notificationscheme-get) supporting search and pagination.
   *
   *   **[Permissions](#permissions) required:** Permission to access Jira, however, the user must have permission to
   *   administer at least one project associated with the notification scheme.
   */
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of
   *   events and the recipients who will receive notifications for those events. Deprecated, use [Get notification
   *   schemes paginated](#api-rest-api-3-notificationscheme-get) supporting search and pagination.
   *
   *   **[Permissions](#permissions) required:** Permission to access Jira, however, the user must have permission to
   *   administer at least one project associated with the notification scheme.
   */
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme,
    callback?: never
  ): Promise<T>;
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/notificationscheme/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
