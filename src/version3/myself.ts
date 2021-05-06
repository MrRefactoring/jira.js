import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Myself {
  constructor(private client: Client) {
  }

  /**
   * Returns the value of a preference of the current user.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default this is not set and the user takes the locale of the instance.
   *  *  *jira.user.timezone* The time zone of the user. By default this is not set and the user takes the timezone of the instance.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getPreference<T = string>(parameters: Parameters.GetPreference, callback: Callback<T>): Promise<void>;
  /**
   * Returns the value of a preference of the current user.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default this is not set and the user takes the locale of the instance.
   *  *  *jira.user.timezone* The time zone of the user. By default this is not set and the user takes the timezone of the instance.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getPreference<T = string>(parameters: Parameters.GetPreference, callback?: never): Promise<T>;
  async getPreference<T = string>(parameters: Parameters.GetPreference, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'GET',
      params: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.getPreference' });
  }

  /**
   * Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:
   *
   *  *  *user.notifications.mimetype* The mime type used in notifications sent to the user. Defaults to `html`.
   *  *  *user.notify.own.changes* Whether the user gets notified of their own changes. Defaults to `false`.
   *  *  *user.default.share.private* Whether new [ filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private. Defaults to `true`.
   *  *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled. Defaults to `false`.
   *  *  *user.autowatch.disabled* Whether the user automatically watches issues they create or add a comment to. By default, not set: the user takes the instance autowatch setting.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.
   *  *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback: Callback<T>): Promise<void>;
  /**
   * Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:
   *
   *  *  *user.notifications.mimetype* The mime type used in notifications sent to the user. Defaults to `html`.
   *  *  *user.notify.own.changes* Whether the user gets notified of their own changes. Defaults to `false`.
   *  *  *user.default.share.private* Whether new [ filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private. Defaults to `true`.
   *  *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled. Defaults to `false`.
   *  *  *user.autowatch.disabled* Whether the user automatically watches issues they create or add a comment to. By default, not set: the user takes the instance autowatch setting.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.
   *  *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback?: never): Promise<T>;
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'PUT',
      params: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.setPreference' });
  }

  /**
   * Deletes a preference of the user, which restores the default value of system defined settings.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.
   *  *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a preference of the user, which restores the default value of system defined settings.
   *
   * Note that these keys are deprecated:
   *
   *  *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.
   *  *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.
   *
   * Use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback?: never): Promise<T>;
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'DELETE',
      params: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.removePreference' });
  }

  /**
   * Returns the locale for the user.
   *
   * If the user has no language preference set (which is the default setting) or this resource is accessed anonymous, the browser locale detected by Jira is returned. Jira detects the browser locale using the *Accept-Language* header in the request. However, if this doesn't match a locale available Jira, the site default locale is returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getLocale<T = Models.Locale>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the locale for the user.
   *
   * If the user has no language preference set (which is the default setting) or this resource is accessed anonymous, the browser locale detected by Jira is returned. Jira detects the browser locale using the *Accept-Language* header in the request. However, if this doesn't match a locale available Jira, the site default locale is returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getLocale<T = Models.Locale>(callback?: never): Promise<T>;
  async getLocale<T = Models.Locale>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.getLocale' });
  }

  /**
   * @deprecated Deprecated, use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API instead.
   *
   * Sets the locale of the user. The locale must be one supported by the instance of Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async setLocale<T = void>(parameters: Parameters.SetLocale | undefined, callback: Callback<T>): Promise<void>;
  /**
   * @deprecated Deprecated, use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API instead.
   *
   * Sets the locale of the user. The locale must be one supported by the instance of Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async setLocale<T = void>(parameters?: Parameters.SetLocale, callback?: never): Promise<T>;
  async setLocale<T = void>(parameters?: Parameters.SetLocale, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'PUT',
      data: {
        locale: parameters?.locale,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.setLocale' });
  }

  /**
   * @deprecated Deprecated, use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API instead.
   *
   * Deletes the locale of the user, which restores the default setting.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async deleteLocale<T = void>(callback: Callback<T>): Promise<void>;
  /**
   * @deprecated Deprecated, use [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API instead.
   *
   * Deletes the locale of the user, which restores the default setting.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async deleteLocale<T = void>(callback?: never): Promise<T>;
  async deleteLocale<T = void>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.deleteLocale' });
  }

  /**
   * Returns details for the current user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getCurrentUser<T = Models.User>(parameters: Parameters.GetCurrentUser | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns details for the current user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: never): Promise<T>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/myself',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.myself.getCurrentUser' });
  }
}
