import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Groups {
  constructor(private client: Client) { }
  /**
     * This operation is deprecated, use [`group/member`](#api-rest-api-3-group-member-get).
     *
     * Returns all users in a group.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback: Callback<T>): Promise<void>;
  /**
     * This operation is deprecated, use [`group/member`](#api-rest-api-3-group-member-get).
     *
     * Returns all users in a group.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: never): Promise<T>;
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getGroup' });
  }
  /**
     * Creates a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async createGroup<T = Models.Group>(parameters: Parameters.CreateGroup | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Creates a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: never): Promise<T>;
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group',
      method: 'POST',
      data: {
        name: parameters?.name,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createGroup' });
  }
  /**
     * Deletes a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* strategic [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeGroup<T = unknown>(parameters: Parameters.RemoveGroup, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* strategic [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeGroup<T = unknown>(parameters: Parameters.RemoveGroup, callback?: never): Promise<T>;
  async removeGroup<T = unknown>(parameters: Parameters.RemoveGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        swapGroup: parameters.swapGroup,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removeGroup' });
  }
  /**
     * Returns a [paginated](#pagination) list of groups.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters: Parameters.BulkGetGroups | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of groups.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: never): Promise<T>;
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group/bulk',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        groupId: parameters?.groupId,
        groupName: parameters?.groupName,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'bulkGetGroups' });
  }
  /**
     * Returns a [paginated](#pagination) list of all users in a group.
     *
     * Note that users are ordered by username, however the username is not returned in the results due to privacy reasons.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of all users in a group.
     *
     * Note that users are ordered by username, however the username is not returned in the results due to privacy reasons.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback?: never): Promise<T>;
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group/member',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        includeInactiveUsers: parameters.includeInactiveUsers,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getUsersFromGroup' });
  }
  /**
     * Adds a user to a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback: Callback<T>): Promise<void>;
  /**
     * Adds a user to a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback?: never): Promise<T>;
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group/user',
      method: 'POST',
      params: {
        groupname: parameters.groupname,
      },
      data: {
        name: parameters.name,
        accountId: parameters.accountId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'addUserToGroup' });
  }
  /**
     * Removes a user from a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeUserFromGroup<T = unknown>(parameters: Parameters.RemoveUserFromGroup, callback: Callback<T>): Promise<void>;
  /**
     * Removes a user from a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)). */
  async removeUserFromGroup<T = unknown>(parameters: Parameters.RemoveUserFromGroup, callback?: never): Promise<T>;
  async removeUserFromGroup<T = unknown>(parameters: Parameters.RemoveUserFromGroup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/group/user',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removeUserFromGroup' });
  }
  /**
     * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.
     *
     * The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically *Showing X of Y matching groups*.
     *
     * The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without the required permission return an empty list. */
  async findGroups<T = Models.FoundGroups>(parameters: Parameters.FindGroups | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.
     *
     * The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically *Showing X of Y matching groups*.
     *
     * The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without the required permission return an empty list. */
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: never): Promise<T>;
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/groups/picker',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        query: parameters?.query,
        exclude: parameters?.exclude,
        maxResults: parameters?.maxResults,
        userName: parameters?.userName,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'findGroups' });
  }
}
