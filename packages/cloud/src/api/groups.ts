import { GroupSchema, type Group } from '#/models/group';
import { PageUserDetailsSchema, type PageUserDetails } from '#/models/pageUserDetails';
import { FoundGroupsSchema, type FoundGroups } from '#/models/foundGroups';
import { type CreateGroup } from '#/parameters/createGroup';
import { type RemoveGroup } from '#/parameters/removeGroup';
import { type GetUsersFromGroup } from '#/parameters/getUsersFromGroup';
import { type AddUserToGroup } from '#/parameters/addUserToGroup';
import { type RemoveUserFromGroup } from '#/parameters/removeUserFromGroup';
import { type FindGroups } from '#/parameters/findGroups';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Creates a group.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Site
 * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function createGroup(client: Client, parameters: CreateGroup): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/rest/api/3/group',
    method: 'POST',
    body: {
      name: parameters.name,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a group.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Site
 * administration (that is, member of the _site-admin_ strategic [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function removeGroup(client: Client, parameters: RemoveGroup): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/group',
    method: 'DELETE',
    searchParams: {
      groupname: parameters.groupname,
      groupId: parameters.groupId,
      swapGroup: parameters.swapGroup,
      swapGroupId: parameters.swapGroupId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all users
 * in a group.
 *
 * Note that users are ordered by username, however the username is not returned in the results due to privacy reasons.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** either of:
 *
 * - _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getUsersFromGroup(client: Client, parameters?: GetUsersFromGroup): Promise<PageUserDetails> {
  const config: SendRequestOptions<PageUserDetails> = {
    url: '/rest/api/3/group/member',
    method: 'GET',
    searchParams: {
      groupname: parameters?.groupname,
      groupId: parameters?.groupId,
      includeInactiveUsers: parameters?.includeInactiveUsers,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageUserDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a user to a group.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Site
 * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function addUserToGroup(client: Client, parameters: AddUserToGroup): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/rest/api/3/group/user',
    method: 'POST',
    searchParams: {
      groupname: parameters.groupname,
      groupId: parameters.groupId,
    },
    body: {
      accountId: parameters.accountId,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes a user from a group.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Site
 * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function removeUserFromGroup(client: Client, parameters: RemoveUserFromGroup): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/group/user',
    method: 'DELETE',
    searchParams: {
      groupname: parameters.groupname,
      groupId: parameters.groupId,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups
 * from the results.
 *
 * The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned
 * object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong
 * tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically
 * _Showing X of Y matching groups_.
 *
 * The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without
 * the required permission return an empty list.
 *
 * _Browse users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Without this permission,
 * calls where query is not an exact match to an existing group will return an empty list.
 */
export async function findGroups(client: Client, parameters?: FindGroups): Promise<FoundGroups> {
  const config: SendRequestOptions<FoundGroups> = {
    url: '/rest/api/3/groups/picker',
    method: 'GET',
    searchParams: {
      query: parameters?.query,
      exclude: parameters?.exclude,
      excludeId: parameters?.excludeId,
      maxResults: parameters?.maxResults,
      caseInsensitive: parameters?.caseInsensitive,
    },
    schema: FoundGroupsSchema,
  };

  return await client.sendRequest(config);
}
