import { GroupSchema, type Group } from '../models/group';
import { GetUsersFromGroupSchema, type GetUsersFromGroup } from '../models/getUsersFromGroup';
import { GroupSuggestionsSchema, type GroupSuggestions } from '../models/groupSuggestions';
import type { CreateGroup } from '../parameters/createGroup';
import type { RemoveGroup } from '../parameters/removeGroup';
import type { GetUsersFromGroup as GetUsersFromGroupParameters } from '../parameters/getUsersFromGroup';
import type { AddUserToGroup } from '../parameters/addUserToGroup';
import type { RemoveUserFromGroup } from '../parameters/removeUserFromGroup';
import type { FindGroups } from '../parameters/findGroups';
import type { Client, SendRequestOptions } from '#/core';

/** Creates a group by given group parameter */
export async function createGroup(client: Client, parameters: CreateGroup): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/rest/api/2/group',
    method: 'POST',
    body: {
      name: parameters.name,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes a group by given group parameter */
export async function removeGroup(client: Client, parameters: RemoveGroup): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/group',
    method: 'DELETE',
    searchParams: {
      groupname: parameters.groupname,
      swapGroup: parameters.swapGroup,
    },
  };

  return await client.sendRequest(config);
}

/** Returns a paginated list of users who are members of the specified group and its subgroups */
export async function getUsersFromGroup(
  client: Client,
  parameters: GetUsersFromGroupParameters,
): Promise<GetUsersFromGroup> {
  const config: SendRequestOptions<GetUsersFromGroup> = {
    url: '/rest/api/2/group/member',
    method: 'GET',
    searchParams: {
      includeInactiveUsers: parameters.includeInactiveUsers,
      maxResults: parameters.maxResults,
      groupname: parameters.groupname,
      startAt: parameters.startAt,
    },
    schema: GetUsersFromGroupSchema,
  };

  return await client.sendRequest(config);
}

/** Adds given user to a group */
export async function addUserToGroup(client: Client, parameters: AddUserToGroup): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/rest/api/2/group/user',
    method: 'POST',
    searchParams: {
      groupname: parameters.groupname,
    },
    body: {
      name: parameters.name,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/** Removes given user from a group */
export async function removeUserFromGroup(client: Client, parameters: RemoveUserFromGroup): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/group/user',
    method: 'DELETE',
    searchParams: {
      groupname: parameters.groupname,
      username: parameters.username,
    },
  };

  return await client.sendRequest(config);
}

/** Returns groups with substrings matching a given query */
export async function findGroups(client: Client, parameters?: FindGroups): Promise<GroupSuggestions> {
  const config: SendRequestOptions<GroupSuggestions> = {
    url: '/rest/api/2/groups/picker',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      exclude: parameters?.exclude,
      userName: parameters?.userName,
    },
    schema: GroupSuggestionsSchema,
  };

  return await client.sendRequest(config);
}
