import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Users {
  constructor(private client: Client) { }
  /**
     * Returns a user.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a user.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: undefined): Promise<T>;
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
        key: parameters?.key,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getUser' });
  }
  /**
     * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.
     *
     * The option is provided to set or generate a password for the user. When using the option to generate a password, by omitting `password` from the request, include `"notification": "true"` to ensure the user is sent an email advising them that their account is created. This email includes a link for the user to set their password. If the notification isn't sent for a generated password, the user will need to be sent a reset password request from Jira.
     *
     * If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have access to Jira, the operation returns a 400 status.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createUser<T = Models.User>(parameters?: Parameters.CreateUser, callback?: Callback<T>): Promise<void>;
  /**
     * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.
     *
     * The option is provided to set or generate a password for the user. When using the option to generate a password, by omitting `password` from the request, include `"notification": "true"` to ensure the user is sent an email advising them that their account is created. This email includes a link for the user to set their password. If the notification isn't sent for a generated password, the user will need to be sent a reset password request from Jira.
     *
     * If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have access to Jira, the operation returns a 400 status.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createUser<T = Models.User>(parameters?: Parameters.CreateUser, callback?: undefined): Promise<T>;
  async createUser<T = Models.User>(parameters?: Parameters.CreateUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'POST',
      data: {
        self: parameters?.self,
        key: parameters?.key,
        name: parameters?.name,
        password: parameters?.password,
        emailAddress: parameters?.emailAddress,
        displayName: parameters?.displayName,
        notification: parameters?.notification,
        applicationKeys: parameters?.applicationKeys,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createUser' });
  }
  /**
     * Deletes a user.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, membership of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a user.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, membership of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback?: undefined): Promise<T>;
  async removeUser<T = void>(parameters: Parameters.RemoveUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'DELETE',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'removeUser' });
  }
  /**
     * Returns a [paginated](#pagination) list of the users specified by one or more account IDs.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of the users specified by one or more account IDs.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback?: undefined): Promise<T>;
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/bulk',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        username: parameters.username,
        key: parameters.key,
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'bulkGetUsers' });
  }
  /**
     * Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or `username` parameters can be specified.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async bulkGetUsersMigration<T = unknown>(parameters?: Parameters.BulkGetUsersMigration, callback?: Callback<T>): Promise<void>;
  /**
     * Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or `username` parameters can be specified.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async bulkGetUsersMigration<T = unknown>(parameters?: Parameters.BulkGetUsersMigration, callback?: undefined): Promise<T>;
  async bulkGetUsersMigration<T = unknown>(parameters?: Parameters.BulkGetUsersMigration, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/bulk/migration',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        username: parameters?.username,
        key: parameters?.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'bulkGetUsersMigration' });
  }
  /**
     * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId` is not passed in the request, the calling user's details are returned.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for any user.
     *  *  Permission to access Jira, to get the calling user's column details. */
  async getUserDefaultColumns<T = unknown>(parameters?: Parameters.GetUserDefaultColumns, callback?: Callback<T>): Promise<void>;
  /**
     * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId` is not passed in the request, the calling user's details are returned.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for any user.
     *  *  Permission to access Jira, to get the calling user's column details. */
  async getUserDefaultColumns<T = unknown>(parameters?: Parameters.GetUserDefaultColumns, callback?: undefined): Promise<T>;
  async getUserDefaultColumns<T = unknown>(parameters?: Parameters.GetUserDefaultColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getUserDefaultColumns' });
  }
  /**
     * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID is not passed, the calling user's default columns are set. If no column details are sent, then all default columns are removed.
     *
     * The parameters for this resource are expressed as HTML form data. For example, in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5'`
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
     *  *  Permission to access Jira, to set the calling user's columns. */
  async setUserColumns<T = unknown>(parameters?: Parameters.SetUserColumns, callback?: Callback<T>): Promise<void>;
  /**
     * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID is not passed, the calling user's default columns are set. If no column details are sent, then all default columns are removed.
     *
     * The parameters for this resource are expressed as HTML form data. For example, in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5'`
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
     *  *  Permission to access Jira, to set the calling user's columns. */
  async setUserColumns<T = unknown>(parameters?: Parameters.SetUserColumns, callback?: undefined): Promise<T>;
  async setUserColumns<T = unknown>(parameters?: Parameters.SetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'PUT',
      params: {
        accountId: parameters?.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'setUserColumns' });
  }
  /**
     * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system default. If `accountId` is not passed, the calling user's default columns are reset.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
     *  *  Permission to access Jira, to set the calling user's columns. */
  async resetUserColumns<T = void>(parameters?: Parameters.ResetUserColumns, callback?: Callback<T>): Promise<void>;
  /**
     * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system default. If `accountId` is not passed, the calling user's default columns are reset.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
     *  *  Permission to access Jira, to set the calling user's columns. */
  async resetUserColumns<T = void>(parameters?: Parameters.ResetUserColumns, callback?: undefined): Promise<T>;
  async resetUserColumns<T = void>(parameters?: Parameters.ResetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'DELETE',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'resetUserColumns' });
  }
  /**
     * Returns a user's email address. This API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603). */
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback: Callback<T>): Promise<void>;
  /**
     * Returns a user's email address. This API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603). */
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback?: undefined): Promise<T>;
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/email',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getUserEmail' });
  }
  /**
     * Returns a user's email address. This API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603). */
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback: Callback<T>): Promise<void>;
  /**
     * Returns a user's email address. This API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603). */
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback?: undefined): Promise<T>;
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/email/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getUserEmailBulk' });
  }
  /**
     * Returns the groups to which a user belongs.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUserGroups<T = unknown>(parameters: Parameters.GetUserGroups, callback: Callback<T>): Promise<void>;
  /**
     * Returns the groups to which a user belongs.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUserGroups<T = unknown>(parameters: Parameters.GetUserGroups, callback?: undefined): Promise<T>;
  async getUserGroups<T = unknown>(parameters: Parameters.GetUserGroups, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/groups',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getUserGroups' });
  }
  /**
     * Returns a list of all (active and inactive) users.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllUsersDefault<T = unknown>(parameters?: Parameters.GetAllUsersDefault, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a list of all (active and inactive) users.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllUsersDefault<T = unknown>(parameters?: Parameters.GetAllUsersDefault, callback?: undefined): Promise<T>;
  async getAllUsersDefault<T = unknown>(parameters?: Parameters.GetAllUsersDefault, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/users',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllUsersDefault' });
  }
  /**
     * Returns a list of all (active and inactive) users.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllUsers<T = unknown>(parameters?: Parameters.GetAllUsers, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a list of all (active and inactive) users.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllUsers<T = unknown>(parameters?: Parameters.GetAllUsers, callback?: undefined): Promise<T>;
  async getAllUsers<T = unknown>(parameters?: Parameters.GetAllUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/users/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllUsers' });
  }
}
