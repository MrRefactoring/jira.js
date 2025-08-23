import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveUserParameters } from './parameters/removeUserParameters';
import type { GetUserParameters } from './parameters/getUserParameters';
import type { CreateUserParameters } from './parameters/createUserParameters';
import type { BulkGetUsersParameters } from './parameters/bulkGetUsersParameters';
import type { BulkGetUsersMigrationParameters } from './parameters/bulkGetUsersMigrationParameters';
import type { ResetUserColumnsParameters } from './parameters/resetUserColumnsParameters';
import type { GetUserDefaultColumnsParameters } from './parameters/getUserDefaultColumnsParameters';
import type { SetUserColumnsParameters } from './parameters/setUserColumnsParameters';
import type { GetUserEmailParameters } from './parameters/getUserEmailParameters';
import type { GetUserEmailBulkParameters } from './parameters/getUserEmailBulkParameters';
import type { GetUserGroupsParameters } from './parameters/getUserGroupsParameters';
import type { GetAllUsersDefaultParameters } from './parameters/getAllUsersDefaultParameters';
import type { GetAllUsersParameters } from './parameters/getAllUsersParameters';

export class Users {
  constructor(private client: Client) {}
  /**
   * Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This
   * operation does not delete the user's Atlassian account. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Site
   *   administration (that is, membership of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUser(parameters: RemoveUserParameters) {
    const request: Request = {
      url: '/rest/api/2/user',
      method: 'DELETE',
      query: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a user. *
   *
   * - Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that
   *   the user's email address is hidden. See the [Profile visibility
   *   overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUser(parameters: GetUserParameters) {
    const request: Request = {
      url: '/rest/api/2/user',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is
   * available this resource will be deprecated. *
   *
   * - If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have
   *   access to Jira, the operation returns a 400 status.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createUser(parameters: CreateUserParameters) {
    const request: Request = {
      url: '/rest/api/2/user',
      method: 'POST',
      body: {
        applicationKeys: parameters.applicationKeys,
        displayName: parameters.displayName,
        emailAddress: parameters.emailAddress,
        key: parameters.key,
        name: parameters.name,
        password: parameters.password,
        products: parameters.products,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * users specified by one or more account IDs. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async bulkGetUsers(parameters: BulkGetUsersParameters) {
    const request: Request = {
      url: '/rest/api/2/user/bulk',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        username: parameters.username,
        key: parameters.key,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or
   * `username` parameters can be specified. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async bulkGetUsersMigration(parameters: BulkGetUsersMigrationParameters) {
    const request: Request = {
      url: '/rest/api/2/user/bulk/migration',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        username: parameters.username,
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system
   * default. If `accountId` is not passed, the calling user's default columns are reset. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - - Permission to access Jira, to set the calling user's columns.
   */
  async resetUserColumns(parameters: ResetUserColumnsParameters) {
    const request: Request = {
      url: '/rest/api/2/user/columns',
      method: 'DELETE',
      query: {
        accountId: parameters.accountId,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId`
   * is not passed in the request, the calling user's details are returned. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for
   *       any user.
   * - - Permission to access Jira, to get the calling user's column details.
   */
  async getUserDefaultColumns(parameters: GetUserDefaultColumnsParameters) {
    const request: Request = {
      url: '/rest/api/2/user/columns',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID
   * is not passed, the calling user's default columns are set. If no column details are sent, then all default columns
   * are removed. *
   *
   * - The parameters for this resource are expressed as HTML form data. For example, in curl:
   * -
   * - `curl -X PUT -d columns=summary -d columns=description
   *   https://your-domain.atlassian.net/rest/api/2/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5'`
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
   * - - Permission to access Jira, to set the calling user's columns.
   */
  async setUserColumns(parameters: SetUserColumnsParameters) {
    const request: Request = {
      url: '/rest/api/2/user/columns',
      method: 'PUT',
      query: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmail(parameters: GetUserEmailParameters) {
    const request: Request = {
      url: '/rest/api/2/user/email',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   */
  async getUserEmailBulk(parameters: GetUserEmailBulkParameters) {
    const request: Request = {
      url: '/rest/api/2/user/email/bulk',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the groups to which a user belongs. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUserGroups(parameters: GetUserGroupsParameters) {
    const request: Request = {
      url: '/rest/api/2/user/groups',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account. *
   *
   * - Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   *   the user's email address is hidden. See the [Profile visibility
   *   overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsersDefault(parameters: GetAllUsersDefaultParameters) {
    const request: Request = {
      url: '/rest/api/2/users',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of all users, including active users, inactive users and previously deleted users that have an
   * Atlassian account. *
   *
   * - Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that
   *   the user's email address is hidden. See the [Profile visibility
   *   overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllUsers(parameters: GetAllUsersParameters) {
    const request: Request = {
      url: '/rest/api/2/users/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }
}
