import type { Client } from '../client';
import type { Request } from '../request';
import type { RemovePreferenceParameters } from './parameters/removePreferenceParameters';
import type { GetPreferenceParameters } from './parameters/getPreferenceParameters';
import type { SetPreferenceParameters } from './parameters/setPreferenceParameters';
import type { GetCurrentUserParameters } from './parameters/getCurrentUserParameters';

export class Myself {
  constructor(private client: Client) {}
  /**
   * Deletes a preference of the user, which restores the default value of system defined settings. *
   *
   * - Note that these keys are deprecated:
   * -
   * - - _jira.user.locale_ The locale of the user. By default, not set. The user takes the instance locale.
   * - - _jira.user.timezone_ The time zone of the user. By default, not set. The user takes the instance timezone.
   * -
   * - Use [ Update a user
   *   profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
   *   from the user management REST API to manage timezone and locale instead.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async removePreference(parameters: RemovePreferenceParameters) {
    const request: Request = {
      url: '/rest/api/2/mypreferences',
      method: 'DELETE',
      query: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the value of a preference of the current user. *
   *
   * - Note that these keys are deprecated:
   * -
   * - - _jira.user.locale_ The locale of the user. By default this is not set and the user takes the locale of the
   *       instance.
   * - - _jira.user.timezone_ The time zone of the user. By default this is not set and the user takes the timezone of the
   *       instance.
   * -
   * - These system preferences keys will be deprecated by 15/07/2024. You can still retrieve these keys, but it will not
   *   have any impact on Notification behaviour.
   * -
   * - - _user.notifications.watcher_ Whether the user gets notified when they are watcher.
   * - - _user.notifications.assignee_ Whether the user gets notified when they are assignee.
   * - - _user.notifications.reporter_ Whether the user gets notified when they are reporter.
   * - - _user.notifications.mentions_ Whether the user gets notified when they are mentions.
   * -
   * - Use [ Update a user
   *   profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
   *   from the user management REST API to manage timezone and locale instead.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getPreference(parameters: GetPreferenceParameters) {
    const request: Request = {
      url: '/rest/api/2/mypreferences',
      method: 'GET',
      query: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a preference for the user or updates a preference's value by sending a plain text string. For example,
   * `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the
   * following keys define system preferences that can be set or created: *
   *
   * - - _user.notifications.mimetype_ The mime type used in notifications sent to the user. Defaults to `html`.
   * - - _user.default.share.private_ Whether new [ filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private.
   *       Defaults to `true`.
   * - - _user.keyboard.shortcuts.disabled_ Whether keyboard shortcuts are disabled. Defaults to `false`.
   * - - _user.autowatch.disabled_ Whether the user automatically watches issues they create or add a comment to. By
   *       default, not set: the user takes the instance autowatch setting.
   * - - _user.notifiy.own.changes_ Whether the user gets notified of their own changes.
   * -
   * - Note that these keys are deprecated:
   * -
   * - - _jira.user.locale_ The locale of the user. By default, not set. The user takes the instance locale.
   * - - _jira.user.timezone_ The time zone of the user. By default, not set. The user takes the instance timezone.
   * -
   * - These system preferences keys will be deprecated by 15/07/2024. You can still use these keys to create arbitrary
   *   preferences, but it will not have any impact on Notification behaviour.
   * -
   * - - _user.notifications.watcher_ Whether the user gets notified when they are watcher.
   * - - _user.notifications.assignee_ Whether the user gets notified when they are assignee.
   * - - _user.notifications.reporter_ Whether the user gets notified when they are reporter.
   * - - _user.notifications.mentions_ Whether the user gets notified when they are mentions.
   * -
   * - Use [ Update a user
   *   profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
   *   from the user management REST API to manage timezone and locale instead.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async setPreference(parameters: SetPreferenceParameters) {
    const request: Request = {
      url: '/rest/api/2/mypreferences',
      method: 'PUT',
      query: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the locale for the user. *
   *
   * - If the user has no language preference set (which is the default setting) or this resource is accessed anonymous,
   *   the browser locale detected by Jira is returned. Jira detects the browser locale using the _Accept-Language_
   *   header in the request. However, if this doesn't match a locale available Jira, the site default locale is
   *   returned.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getLocale() {
    const request: Request = {
      url: '/rest/api/2/mypreferences/locale',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns details for the current user. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getCurrentUser(parameters: GetCurrentUserParameters) {
    const request: Request = {
      url: '/rest/api/2/myself',
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }
}
