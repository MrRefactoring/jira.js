import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveGroupParameters } from './parameters/removeGroupParameters';
import type { CreateGroupParameters } from './parameters/createGroupParameters';
import type { BulkGetGroupsParameters } from './parameters/bulkGetGroupsParameters';
import type { GetUsersFromGroupParameters } from './parameters/getUsersFromGroupParameters';
import type { RemoveUserFromGroupParameters } from './parameters/removeUserFromGroupParameters';
import type { AddUserToGroupParameters } from './parameters/addUserToGroupParameters';
import type { FindGroupsParameters } from './parameters/findGroupsParameters';

export class Groups {
  constructor(private client: Client) {}
  /**
   * Deletes a group. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Site
   *   administration (that is, member of the _site-admin_ strategic
   *   [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeGroup(parameters: RemoveGroupParameters) {
    const request: Request = {
      url: '/rest/api/2/group',
      method: 'DELETE',
      query: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        swapGroup: parameters.swapGroup,
        swapGroupId: parameters.swapGroupId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a group. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Site
   *   administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async createGroup(parameters: CreateGroupParameters) {
    const request: Request = {
      url: '/rest/api/2/group',
      method: 'POST',
      body: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * groups. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async bulkGetGroups(parameters: BulkGetGroupsParameters) {
    const request: Request = {
      url: '/rest/api/2/group/bulk',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        groupId: parameters.groupId,
        groupName: parameters.groupName,
        accessType: parameters.accessType,
        applicationKey: parameters.applicationKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * users in a group. *
   *
   * - Note that users are ordered by username, however the username is not returned in the results due to privacy
   *   reasons.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either
   *   of:
   * -
   * - - _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getUsersFromGroup(parameters: GetUsersFromGroupParameters) {
    const request: Request = {
      url: '/rest/api/2/group/member',
      method: 'GET',
      query: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        includeInactiveUsers: parameters.includeInactiveUsers,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes a user from a group. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Site
   *   administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async removeUserFromGroup(parameters: RemoveUserFromGroupParameters) {
    const request: Request = {
      url: '/rest/api/2/group/user',
      method: 'DELETE',
      query: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a user to a group. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Site
   *   administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
   */
  async addUserToGroup(parameters: AddUserToGroupParameters) {
    const request: Request = {
      url: '/rest/api/2/group/user',
      method: 'POST',
      query: {
        groupname: parameters.groupname,
        groupId: parameters.groupId,
      },
      body: {
        accountId: parameters.accountId,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude
   * groups from the results. *
   *
   * - The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned
   *   object includes the `html` field where the matched query term is highlighted in the group name with the HTML
   *   strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker,
   *   specifically _Showing X of Y matching groups_.
   * -
   * - The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users
   *   without the required permission return an empty list.
   * -
   * - _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Without this permission,
   *   calls where query is not an exact match to an existing group will return an empty list.
   */
  async findGroups(parameters: FindGroupsParameters) {
    const request: Request = {
      url: '/rest/api/2/groups/picker',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        query: parameters.query,
        exclude: parameters.exclude,
        excludeId: parameters.excludeId,
        maxResults: parameters.maxResults,
        caseInsensitive: parameters.caseInsensitive,
        userName: parameters.userName,
        includeTeams: parameters.includeTeams,
      },
    };

    return this.client.sendRequest(request);
  }
}
