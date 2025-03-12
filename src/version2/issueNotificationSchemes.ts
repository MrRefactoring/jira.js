import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueNotificationSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
   *
   * _Note that you should allow for events without recipients to appear in responses._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters: Parameters.GetNotificationSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
   *
   * _Note that you should allow for events without recipients to appear in responses._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: never,
  ): Promise<T>;
  async getNotificationSchemes<T = Models.PageNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/notificationscheme',
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
   * Creates a notification scheme with notifications. You can create up to 1000 notifications per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createNotificationScheme<T = Models.NotificationSchemeId>(
    parameters: Parameters.CreateNotificationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a notification scheme with notifications. You can create up to 1000 notifications per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createNotificationScheme<T = Models.NotificationSchemeId>(
    parameters: Parameters.CreateNotificationScheme,
    callback?: never,
  ): Promise<T>;
  async createNotificationScheme<T = Models.NotificationSchemeId>(
    parameters: Parameters.CreateNotificationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/notificationscheme',
      method: 'POST',
      data: {
        description: parameters.description,
        name: parameters.name,
        notificationSchemeEvents: parameters.notificationSchemeEvents,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or
   * project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only
   * company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a
   * default notification scheme. The mappings are ordered by projectId.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getNotificationSchemeToProjectMappings<T = Models.NotificationSchemeAndProjectMappingPage>(
    parameters: Parameters.GetNotificationSchemeToProjectMappings | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or
   * project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only
   * company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a
   * default notification scheme. The mappings are ordered by projectId.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getNotificationSchemeToProjectMappings<T = Models.NotificationSchemeAndProjectMappingPage>(
    parameters?: Parameters.GetNotificationSchemeToProjectMappings,
    callback?: never,
  ): Promise<T>;
  async getNotificationSchemeToProjectMappings<T = Models.NotificationSchemeAndProjectMappingPage>(
    parameters?: Parameters.GetNotificationSchemeToProjectMappings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/notificationscheme/project',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        notificationSchemeId: parameters?.notificationSchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
   * recipients who will receive notifications for those events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with the notification scheme.
   */
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
   * recipients who will receive notifications for those events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user must have permission to administer at least one project associated
   * with the notification scheme.
   */
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme | string,
    callback?: never,
  ): Promise<T>;
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/notificationscheme/${id}`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateNotificationScheme<T = void>(
    parameters: Parameters.UpdateNotificationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateNotificationScheme<T = void>(
    parameters: Parameters.UpdateNotificationScheme,
    callback?: never,
  ): Promise<T>;
  async updateNotificationScheme<T = void>(
    parameters: Parameters.UpdateNotificationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/notificationscheme/${parameters.id}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds notifications to a notification scheme. You can add up to 1000 notifications per request.
   *
   * _Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the
   * [changelog](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addNotifications<T = void>(parameters: Parameters.AddNotifications, callback: Callback<T>): Promise<void>;
  /**
   * Adds notifications to a notification scheme. You can add up to 1000 notifications per request.
   *
   * _Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the
   * [changelog](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details._
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addNotifications<T = void>(parameters: Parameters.AddNotifications, callback?: never): Promise<T>;
  async addNotifications<T = void>(parameters: Parameters.AddNotifications, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/notificationscheme/${parameters.id}/notification`,
      method: 'PUT',
      data: {
        notificationSchemeEvents: parameters.notificationSchemeEvents,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteNotificationScheme<T = void>(
    parameters: Parameters.DeleteNotificationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteNotificationScheme<T = void>(
    parameters: Parameters.DeleteNotificationScheme,
    callback?: never,
  ): Promise<T>;
  async deleteNotificationScheme<T = void>(
    parameters: Parameters.DeleteNotificationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/notificationscheme/${parameters.notificationSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a notification from a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeNotificationFromNotificationScheme<T = void>(
    parameters: Parameters.RemoveNotificationFromNotificationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes a notification from a notification scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeNotificationFromNotificationScheme<T = void>(
    parameters: Parameters.RemoveNotificationFromNotificationScheme,
    callback?: never,
  ): Promise<T>;
  async removeNotificationFromNotificationScheme<T = void>(
    parameters: Parameters.RemoveNotificationFromNotificationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/notificationscheme/${parameters.notificationSchemeId}/notification/${parameters.notificationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
