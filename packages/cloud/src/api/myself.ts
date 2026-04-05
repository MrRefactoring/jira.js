import { LocaleSchema, type Locale } from '#/models/locale';
import { DashboardUserSchema, type DashboardUser } from '#/models/dashboardUser';
import { type GetPreference } from '#/parameters/getPreference';
import { type SetPreference } from '#/parameters/setPreference';
import { type RemovePreference } from '#/parameters/removePreference';
import { type GetCurrentUser } from '#/parameters/getCurrentUser';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns the value of a preference of the current user.
 *
 * Note that these keys are deprecated:
 *
 * - _jira.user.locale_ The locale of the user. By default this is not set and the user takes the locale of the instance.
 * - _jira.user.timezone_ The time zone of the user. By default this is not set and the user takes the timezone of the
 *   instance.
 *
 * These system preferences keys will be deprecated by 15/07/2024. You can still retrieve these keys, but it will not
 * have any impact on Notification behaviour.
 *
 * - _user.notifications.watcher_ Whether the user gets notified when they are watcher.
 * - _user.notifications.assignee_ Whether the user gets notified when they are assignee.
 * - _user.notifications.reporter_ Whether the user gets notified when they are reporter.
 * - _user.notifications.mentions_ Whether the user gets notified when they are mentions.
 *
 * Use [ Update a user
 * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
 * from the user management REST API to manage timezone and locale instead.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getPreference(client: Client, parameters: GetPreference): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: '/rest/api/3/mypreferences',
    method: 'GET',
    searchParams: {
      key: parameters.key,
    },
    schema: z.string(),
  };

  return await client.sendRequest(config);
}

/**
 * Creates a preference for the user or updates a preference's value by sending a plain text string. For example,
 * `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the
 * following keys define system preferences that can be set or created:
 *
 * - _user.notifications.mimetype_ The mime type used in notifications sent to the user. Defaults to `html`.
 * - _user.default.share.private_ Whether new [ filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private.
 *   Defaults to `true`.
 * - _user.keyboard.shortcuts.disabled_ Whether keyboard shortcuts are disabled. Defaults to `false`.
 * - _user.autowatch.disabled_ Whether the user automatically watches issues they create or add a comment to. By default,
 *   not set: the user takes the instance autowatch setting.
 * - _user.notifiy.own.changes_ Whether the user gets notified of their own changes.
 *
 * Note that these keys are deprecated:
 *
 * - _jira.user.locale_ The locale of the user. By default, not set. The user takes the instance locale.
 * - _jira.user.timezone_ The time zone of the user. By default, not set. The user takes the instance timezone.
 *
 * These system preferences keys will be deprecated by 15/07/2024. You can still use these keys to create arbitrary
 * preferences, but it will not have any impact on Notification behaviour.
 *
 * - _user.notifications.watcher_ Whether the user gets notified when they are watcher.
 * - _user.notifications.assignee_ Whether the user gets notified when they are assignee.
 * - _user.notifications.reporter_ Whether the user gets notified when they are reporter.
 * - _user.notifications.mentions_ Whether the user gets notified when they are mentions.
 *
 * Use [ Update a user
 * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
 * from the user management REST API to manage timezone and locale instead.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function setPreference(client: Client, parameters: SetPreference): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/mypreferences',
    method: 'PUT',
    headers: { 'Content-Type': 'text/plain' },
    searchParams: {
      key: parameters.key,
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a preference of the user, which restores the default value of system defined settings.
 *
 * Note that these keys are deprecated:
 *
 * - _jira.user.locale_ The locale of the user. By default, not set. The user takes the instance locale.
 * - _jira.user.timezone_ The time zone of the user. By default, not set. The user takes the instance timezone.
 *
 * Use [ Update a user
 * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
 * from the user management REST API to manage timezone and locale instead.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function removePreference(client: Client, parameters: RemovePreference): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/mypreferences',
    method: 'DELETE',
    searchParams: {
      key: parameters.key,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the locale for the user.
 *
 * If the user has no language preference set (which is the default setting) or this resource is accessed anonymous, the
 * browser locale detected by Jira is returned. Jira detects the browser locale using the _Accept-Language_ header in
 * the request. However, if this doesn't match a locale available Jira, the site default locale is returned.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getLocale(client: Client): Promise<Locale> {
  const config: SendRequestOptions<Locale> = {
    url: '/rest/api/3/mypreferences/locale',
    method: 'GET',
    schema: LocaleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns details for the current user.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getCurrentUser(client: Client, parameters?: GetCurrentUser): Promise<DashboardUser> {
  const config: SendRequestOptions<DashboardUser> = {
    url: '/rest/api/3/myself',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: DashboardUserSchema,
  };

  return await client.sendRequest(config);
}
