import type { Client } from '../client';
import type { Request } from '../request';
import type { GetNotificationSchemesParameters } from './parameters/getNotificationSchemesParameters';
import type { CreateNotificationSchemeParameters } from './parameters/createNotificationSchemeParameters';
import type { GetNotificationSchemeToProjectMappingsParameters } from './parameters/getNotificationSchemeToProjectMappingsParameters';
import type { GetNotificationSchemeParameters } from './parameters/getNotificationSchemeParameters';
import type { UpdateNotificationSchemeParameters } from './parameters/updateNotificationSchemeParameters';
import type { AddNotificationsParameters } from './parameters/addNotificationsParameters';
import type { DeleteNotificationSchemeParameters } from './parameters/deleteNotificationSchemeParameters';
import type { RemoveNotificationFromNotificationSchemeParameters } from './parameters/removeNotificationFromNotificationSchemeParameters';

export class IssueNotificationSchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name. *
   *
   * - _Note that you should allow for events without recipients to appear in responses._
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, the user must have permission to administer at least one project associated
   *   with a notification scheme for it to be returned.
   */
  async getNotificationSchemes(parameters: GetNotificationSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/notificationscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        projectId: parameters.projectId,
        onlyDefault: parameters.onlyDefault,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a notification scheme with notifications. You can create up to 1000 notifications per request. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createNotificationScheme(parameters: CreateNotificationSchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/notificationscheme',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
        notificationSchemeEvents: parameters.notificationSchemeEvents,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or
   * project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only
   * company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a
   * default notification scheme. The mappings are ordered by projectId. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getNotificationSchemeToProjectMappings(parameters: GetNotificationSchemeToProjectMappingsParameters) {
    const request: Request = {
      url: '/rest/api/2/notificationscheme/project',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        notificationSchemeId: parameters.notificationSchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
   * recipients who will receive notifications for those events. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, the user must have permission to administer at least one project associated
   *   with the notification scheme.
   */
  async getNotificationScheme(parameters: GetNotificationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/notificationscheme/${parameters.id}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a notification scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateNotificationScheme(parameters: UpdateNotificationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/notificationscheme/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds notifications to a notification scheme. You can add up to 1000 notifications per request. *
   *
   * - _Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the
   *   [changelog](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details._
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addNotifications(parameters: AddNotificationsParameters) {
    const request: Request = {
      url: `/rest/api/2/notificationscheme/${parameters.id}/notification`,
      method: 'PUT',
      body: {
        notificationSchemeEvents: parameters.notificationSchemeEvents,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a notification scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteNotificationScheme(parameters: DeleteNotificationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/notificationscheme/${parameters.notificationSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes a notification from a notification scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeNotificationFromNotificationScheme(parameters: RemoveNotificationFromNotificationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/notificationscheme/${parameters.notificationSchemeId}/notification/${parameters.notificationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }
}
