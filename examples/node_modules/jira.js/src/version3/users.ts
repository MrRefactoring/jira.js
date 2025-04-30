import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import { paramSerializer } from '../paramSerializer';
import type { RequestConfig } from '../requestConfig';

export class Users {
  constructor(private client: Client) {}

  /**
   * Returns a user.
   *
   * Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback: Callback<T>): Promise<void>;
  /**
   * Returns a user.
   *
   * Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: never): Promise<T>;
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is
   * available this resource will be deprecated.
   *
   * If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have
   * access to Jira, the operation returns a 400 status.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createUser<T = Models.User>(parameters: Parameters.CreateUser, callback: Callback<T>): Promise<void>;
  /**
   * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is
   * available this resource will be deprecated.
   *
   * If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have
   * access to Jira, the operation returns a 400 status.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createUser<T = Models.User>(parameters: Parameters.CreateUser, callback?: never): Promise<T>;
  async createUser<T = Models.User>(parameters: Parameters.CreateUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user',
      method: 'POST',
      data: {
        emailAddress: parameters.emailAddress,
        products: parameters.products
          ? parameters.products
          : ['jira-core', 'jira-servicedesk', 'jira-product-discovery', 'jira-software'],
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This
   * operation does not delete the user's Atlassian account.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, membership of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This
   * operation does not delete the user's Atlassian account.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, membership of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback?: never): Promise<T>;
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user',
      method: 'DELETE',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the
   * users specified by one or more account IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async bulkGetUsers<T = Models.PageUser>(parameters: Parameters.BulkGetUsers, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the
   * users specified by one or more account IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async bulkGetUsers<T = Models.PageUser>(parameters: Parameters.BulkGetUsers, callback?: never): Promise<T>;
  async bulkGetUsers<T = Models.PageUser>(
    parameters: Parameters.BulkGetUsers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/bulk',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        accountId: paramSerializer('accountId', parameters.accountId),
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or
   * `username` parameters can be specified.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async bulkGetUsersMigration<T = Models.UserMigration[]>(
    parameters: Parameters.BulkGetUsersMigration,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or
   * `username` parameters can be specified.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async bulkGetUsersMigration<T = Models.UserMigration[]>(
    parameters: Parameters.BulkGetUsersMigration,
    callback?: never,
  ): Promise<T>;
  async bulkGetUsersMigration<T = Models.UserMigration[]>(
    parameters: Parameters.BulkGetUsersMigration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/bulk/migration',
      method: 'GET',
      params: {
        key: paramSerializer('key', parameters.key),
        maxResults: parameters.maxResults,
        startAt: parameters.startAt,
        username: paramSerializer('username', parameters.username),
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId`
   * is not passed in the request, the calling user's details are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for
   *   any user.
   * - Permission to access Jira, to get the calling user's column details.
   */
  async getUserDefaultColumns<T = Models.ColumnItem[]>(
    parameters: Parameters.GetUserDefaultColumns | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId`
   * is not passed in the request, the calling user's details are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for
   *   any user.
   * - Permission to access Jira, to get the calling user's column details.
   */
  async getUserDefaultColumns<T = Models.ColumnItem[]>(
    parameters?: Parameters.GetUserDefaultColumns,
    callback?: never,
  ): Promise<T>;
  async getUserDefaultColumns<T = Models.ColumnItem[]>(
    parameters?: Parameters.GetUserDefaultColumns,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID
   * is not passed, the calling user's default columns are set. If no column details are sent, then all default columns
   * are removed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - Permission to access Jira, to set the calling user's columns.
   */
  async setUserColumns<T = string>(parameters: Parameters.SetUserColumns, callback: Callback<T>): Promise<void>;
  /**
   * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID
   * is not passed, the calling user's default columns are set. If no column details are sent, then all default columns
   * are removed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - Permission to access Jira, to set the calling user's columns.
   */
  async setUserColumns<T = string>(parameters: Parameters.SetUserColumns, callback?: never): Promise<T>;
  async setUserColumns<T = string>(parameters: Parameters.SetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'PUT',
      params: {
        accountId: parameters.accountId,
      },
      data: parameters.columns,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system
   * default. If `accountId` is not passed, the calling user's default columns are reset.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - Permission to access Jira, to set the calling user's columns.
   */
  async resetUserColumns<T = void>(parameters: Parameters.ResetUserColumns, callback: Callback<T>): Promise<void>;
  /**
   * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system
   * default. If `accountId` is not passed, the calling user's default columns are reset.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - Permission to access Jira, to set the calling user's columns.
   */
  async resetUserColumns<T = void>(parameters: Parameters.ResetUserColumns, callback?: never): Promise<T>;
  async resetUserColumns<T = void>(parameters: Parameters.ResetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'DELETE',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmail<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmail | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmail<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmail | string,
    callback?: never,
  ): Promise<T>;
  async getUserEmail<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmail | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const accountId = typeof parameters === 'string' ? parameters : parameters.accountId;

    const config: RequestConfig = {
      url: '/rest/api/3/user/email',
      method: 'GET',
      params: {
        accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmailBulk | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmailBulk | string,
    callback?: never,
  ): Promise<T>;
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(
    parameters: Parameters.GetUserEmailBulk | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const accountId = typeof parameters === 'string' ? parameters : parameters.accountId;

    const config: RequestConfig = {
      url: '/rest/api/3/user/email/bulk',
      method: 'GET',
      params: {
        accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the groups to which a user belongs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUserGroups<T = Models.GroupName[]>(
    parameters: Parameters.GetUserGroups,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the groups to which a user belongs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUserGroups<T = Models.GroupName[]>(parameters: Parameters.GetUserGroups, callback?: never): Promise<T>;
  async getUserGroups<T = Models.GroupName[]>(
    parameters: Parameters.GetUserGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/groups',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account.
   *
   * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsersDefault<T = Models.User[]>(
    parameters: Parameters.GetAllUsersDefault | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account.
   *
   * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsersDefault<T = Models.User[]>(parameters?: Parameters.GetAllUsersDefault, callback?: never): Promise<T>;
  async getAllUsersDefault<T = Models.User[]>(
    parameters?: Parameters.GetAllUsersDefault,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/users',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account.
   *
   * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsers<T = Models.User[]>(
    parameters: Parameters.GetAllUsers | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account.
   *
   * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   * the user's email address is hidden. See the [Profile visibility
   * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsers<T = Models.User[]>(parameters?: Parameters.GetAllUsers, callback?: never): Promise<T>;
  async getAllUsers<T = Models.User[]>(parameters?: Parameters.GetAllUsers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/users/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
