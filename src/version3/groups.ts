import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Groups {
  constructor(private client: Client) {}

  /**
   * @deprecated This operation is deprecated, use [`group/member`](#api-rest-api-3-group-member-get).
   *
   *   Returns all users in a group.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback: Callback<T>): Promise<void>;
  /**
   * @deprecated This operation is deprecated, use [`group/member`](#api-rest-api-3-group-member-get).
   *
   *   Returns all users in a group.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: never): Promise<T>;
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async createGroup<T = Models.Group>(parameters: Parameters.CreateGroup, callback: Callback<T>): Promise<void>;
  /**
   * Creates a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async createGroup<T = Models.Group>(parameters: Parameters.CreateGroup, callback?: never): Promise<T>;
  async createGroup<T = Models.Group>(parameters: Parameters.CreateGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group',
      method: 'POST',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ strategic [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeGroup<T = string>(parameters: Parameters.RemoveGroup, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ strategic [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeGroup<T = string>(parameters: Parameters.RemoveGroup, callback?: never): Promise<T>;
  async removeGroup<T = string>(parameters: Parameters.RemoveGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        swapGroup: parameters.swapGroup,
        swapGroupId: parameters.swapGroupId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * groups.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async bulkGetGroups<T = Models.PageGroupDetails>(
    parameters: Parameters.BulkGetGroups | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * groups.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async bulkGetGroups<T = Models.PageGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: never): Promise<T>;
  async bulkGetGroups<T = Models.PageGroupDetails>(
    parameters?: Parameters.BulkGetGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group/bulk',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        groupId: parameters?.groupId,
        groupName: parameters?.groupName,
        accessType: parameters?.accessType,
        applicationKey: parameters?.applicationKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * users in a group.
   *
   * Note that users are ordered by username, however the username is not returned in the results due to privacy
   * reasons.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUsersFromGroup<T = Models.PageUserDetails>(
    parameters: Parameters.GetUsersFromGroup,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * users in a group.
   *
   * Note that users are ordered by username, however the username is not returned in the results due to privacy
   * reasons.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUsersFromGroup<T = Models.PageUserDetails>(
    parameters: Parameters.GetUsersFromGroup,
    callback?: never
  ): Promise<T>;
  async getUsersFromGroup<T = Models.PageUserDetails>(
    parameters: Parameters.GetUsersFromGroup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group/member',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        includeInactiveUsers: parameters.includeInactiveUsers,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user to a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user to a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback?: never): Promise<T>;
  async addUserToGroup<T = Models.Group>(
    parameters: Parameters.AddUserToGroup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group/user',
      method: 'POST',
      params: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
      },
      data: {
        name: parameters.name,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a user from a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUserFromGroup<T = unknown>(
    parameters: Parameters.RemoveUserFromGroup,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes a user from a group.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Site
   * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUserFromGroup<T = unknown>(parameters: Parameters.RemoveUserFromGroup, callback?: never): Promise<T>;
  async removeUserFromGroup<T = unknown>(
    parameters: Parameters.RemoveUserFromGroup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/group/user',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude
   * groups from the results.
   *
   * The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned
   * object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong
   * tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker,
   * specifically _Showing X of Y matching groups_.
   *
   * The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users
   * without the required permission return an empty list.
   *
   * _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Without this permission,
   * calls where query is not an exact match to an existing group will return an empty list.
   */
  async findGroups<T = Models.FoundGroups>(
    parameters: Parameters.FindGroups | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude
   * groups from the results.
   *
   * The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned
   * object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong
   * tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker,
   * specifically _Showing X of Y matching groups_.
   *
   * The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users
   * without the required permission return an empty list.
   *
   * _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Without this permission,
   * calls where query is not an exact match to an existing group will return an empty list.
   */
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: never): Promise<T>;
  async findGroups<T = Models.FoundGroups>(
    parameters?: Parameters.FindGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/groups/picker',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        caseInsensitive: parameters?.caseInsensitive,
        exclude: parameters?.exclude,
        excludeId: parameters?.excludeId,
        maxResults: parameters?.maxResults,
        query: parameters?.query,
        userName: parameters?.userName,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
