import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueNotificationSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by display name.
   *
   * ### About notification schemes
   *
   * A notification scheme is a list of events and recipients who will receive notifications for those events. The list
   * is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`:
   *
   * - `event` Identifies the type of event. The events can be [Jira system
   *   events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom
   *   events](https://confluence.atlassian.com/x/AIlKLg).
   * - `notifications` Identifies the
   *   [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of
   *   notifications for each event. Recipients can be any of the following types:
   *
   *   - `CurrentAssignee`
   *   - `Reporter`
   *   - `CurrentUser`
   *   - `ProjectLead`
   *   - `ComponentLead`
   *   - `User` (the `parameter` is the user key)
   *   - `Group` (the `parameter` is the group name)
   *   - `ProjectRole` (the `parameter` is the project role ID)
   *   - `EmailAddress`
   *   - `AllWatchers`
   *   - `UserCustomField` (the `parameter` is the ID of the custom field)
   *   - `GroupCustomField`(the `parameter` is the ID of the custom field)
   *
   * *Note that you should allow for events without recipients to appear in responses.*
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however the user must have permission to administer at least one project associated with
   * a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(
    parameters: Parameters.GetNotificationSchemes | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by display name.
   *
   * ### About notification schemes
   *
   * A notification scheme is a list of events and recipients who will receive notifications for those events. The list
   * is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`:
   *
   * - `event` Identifies the type of event. The events can be [Jira system
   *   events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom
   *   events](https://confluence.atlassian.com/x/AIlKLg).
   * - `notifications` Identifies the
   *   [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of
   *   notifications for each event. Recipients can be any of the following types:
   *
   *   - `CurrentAssignee`
   *   - `Reporter`
   *   - `CurrentUser`
   *   - `ProjectLead`
   *   - `ComponentLead`
   *   - `User` (the `parameter` is the user key)
   *   - `Group` (the `parameter` is the group name)
   *   - `ProjectRole` (the `parameter` is the project role ID)
   *   - `EmailAddress`
   *   - `AllWatchers`
   *   - `UserCustomField` (the `parameter` is the ID of the custom field)
   *   - `GroupCustomField`(the `parameter` is the ID of the custom field)
   *
   * *Note that you should allow for events without recipients to appear in responses.*
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however the user must have permission to administer at least one project associated with
   * a notification scheme for it to be returned.
   */
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: never
  ): Promise<T>;
  async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(
    parameters?: Parameters.GetNotificationSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/notificationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.issueNotificationSchemes.getNotificationSchemes',
    });
  }

  /**
   * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
   * recipients who will receive notifications for those events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however the user must have permission to administer at least one project associated with
   * the notification scheme.
   */
  async getNotificationScheme<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
   * recipients who will receive notifications for those events.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira, however the user must have permission to administer at least one project associated with
   * the notification scheme.
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

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.issueNotificationSchemes.getNotificationScheme',
    });
  }
}
