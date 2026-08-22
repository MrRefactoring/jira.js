import { PageNotificationSchemeSchema } from '../models/pageNotificationScheme';
import type { Page } from '../models/page';
import { NotificationSchemeSchema, type NotificationScheme } from '../models/notificationScheme';
import { NotificationSchemeAndProjectMappingPageSchema } from '../models/notificationSchemeAndProjectMappingPage';
import type { NotificationSchemeAndProjectMapping } from '../models/notificationSchemeAndProjectMapping';
import type { GetNotificationSchemes } from '../parameters/getNotificationSchemes';
import type { GetNotificationSchemeToProjectMappings } from '../parameters/getNotificationSchemeToProjectMappings';
import type { GetNotificationScheme } from '../parameters/getNotificationScheme';
import type { AddNotifications } from '../parameters/addNotifications';
import type { RemoveNotificationFromNotificationScheme } from '../parameters/removeNotificationFromNotificationScheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of
 * [notification schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
 *
 * _Note that you should allow for events without recipients to appear in responses._
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, the user must have permission to administer at least one project associated with a
 * notification scheme for it to be returned.
 */
export async function getNotificationSchemes(
  client: Client,
  parameters?: GetNotificationSchemes,
  options?: RequestOptions,
): Promise<Page<NotificationScheme>> {
  const config: SendRequestOptions<Page<NotificationScheme>> = {
    url: '/rest/api/3/notificationscheme',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      projectId: parameters?.projectId,
      onlyDefault: parameters?.onlyDefault,
      expand: parameters?.expand,
    },
    schema: PageNotificationSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) mapping of
 * project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or
 * project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only
 * company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a
 * default notification scheme. The mappings are ordered by projectId.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getNotificationSchemeToProjectMappings(
  client: Client,
  parameters?: GetNotificationSchemeToProjectMappings,
  options?: RequestOptions,
): Promise<Page<NotificationSchemeAndProjectMapping>> {
  const config: SendRequestOptions<Page<NotificationSchemeAndProjectMapping>> = {
    url: '/rest/api/3/notificationscheme/project',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      notificationSchemeId: parameters?.notificationSchemeId,
      projectId: parameters?.projectId,
    },
    schema: NotificationSchemeAndProjectMappingPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the
 * recipients who will receive notifications for those events.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, the user must have permission to administer at least one project associated with the
 * notification scheme.
 */
export async function getNotificationScheme(
  client: Client,
  parameters: GetNotificationScheme,
  options?: RequestOptions,
): Promise<NotificationScheme> {
  const config: SendRequestOptions<NotificationScheme> = {
    url: `/rest/api/3/notificationscheme/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: NotificationSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Adds notifications to a notification scheme. You can add up to 1000 notifications per request.
 *
 * _Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the
 * [changelog](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details._
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addNotifications(
  client: Client,
  parameters: AddNotifications,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/notificationscheme/${parameters.id}/notification`,
    method: 'PUT',
    body: {
      notificationSchemeEvents: parameters.notificationSchemeEvents,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes a notification from a notification scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeNotificationFromNotificationScheme(
  client: Client,
  parameters: RemoveNotificationFromNotificationScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/notificationscheme/${parameters.notificationSchemeId}/notification/${parameters.notificationId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
