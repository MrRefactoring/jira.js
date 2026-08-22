import { PagedResultsSchema, type PagedResults } from '../models/pagedResults';
import { NotificationSchemeSchema, type NotificationScheme } from '../models/notificationScheme';
import type { GetNotificationSchemes } from '../parameters/getNotificationSchemes';
import type { GetNotificationScheme } from '../parameters/getNotificationScheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a paginated list of notification schemes. In order to access notification scheme, the calling user is
 * required to have permissions to administer at least one project associated with the requested notification scheme.
 * Each scheme contains a list of events and recipient configured to receive notifications for these events. Consumer
 * should allow events without recipients to appear in response. The list is ordered by the scheme's name. Follow the
 * documentation of /notificationscheme/{id} resource for all details about returned value.
 */
export async function getNotificationSchemes(
  client: Client,
  parameters?: GetNotificationSchemes,
  options?: RequestOptions,
): Promise<PagedResults> {
  const config: SendRequestOptions<PagedResults> = {
    url: '/rest/api/2/notificationscheme',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      maxResults: parameters?.maxResults,
      startAt: parameters?.startAt,
    },
    schema: PagedResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a full representation of the notification scheme for the given id. This resource will return a notification
 * scheme containing a list of events and recipient configured to receive notifications for these events. Consumer
 * should allow events without recipients to appear in response. User accessing the data is required to have permissions
 * to administer at least one project associated with the requested notification scheme. Notification recipients can
 * be:
 *
 * - Current assignee - the value of the notificationType is CurrentAssignee
 * - Issue reporter - the value of the notificationType is Reporter
 * - Current user - the value of the notificationType is CurrentUser
 * - Project lead - the value of the notificationType is ProjectLead
 * - Component lead - the value of the notificationType is ComponentLead
 * - All watchers - the value of the notification type is AllWatchers
 * - Configured user - the value of the notification type is User. Parameter will contain key of the user. Information
 *   about the user will be provided if **user** expand parameter is used.
 * - Configured group - the value of the notification type is Group. Parameter will contain name of the group. Information
 *   about the group will be provided if **group** expand parameter is used.
 * - Configured email address - the value of the notification type is EmailAddress, additionally information about the
 *   email will be provided.
 * - Users or users in groups in the configured custom fields - the value of the notification type is UserCustomField or
 *   GroupCustomField. Parameter will contain id of the custom field. Information about the field will be provided if
 *   **field** expand parameter is used.
 * - Configured project role - the value of the notification type is ProjectRole. Parameter will contain project role id.
 *   Information about the project role will be provided if **projectRole** expand parameter is used. Please see the
 *   example for reference. The events can be Jira system events or events configured by administrator. In case of the
 *   system events, data about theirs ids, names and descriptions is provided. In case of custom events, the template
 *   event is included as well.
 */
export async function getNotificationScheme(
  client: Client,
  parameters: GetNotificationScheme,
  options?: RequestOptions,
): Promise<NotificationScheme> {
  const config: SendRequestOptions<NotificationScheme> = {
    url: `/rest/api/2/notificationscheme/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: NotificationSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
