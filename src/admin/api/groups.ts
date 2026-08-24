import {
  MultiDirectoryGroupSearchPageSchema,
  type MultiDirectoryGroupSearchPage,
} from '../models/multiDirectoryGroupSearchPage';
import {
  MultiDirectoryGroupRoleAssignmentPageSchema,
  type MultiDirectoryGroupRoleAssignmentPage,
} from '../models/multiDirectoryGroupRoleAssignmentPage';
import {
  MultiDirectoryGroupDetailsSchema,
  type MultiDirectoryGroupDetails,
} from '../models/multiDirectoryGroupDetails';
import { GetGroupsCountSchema, type GetGroupsCount } from '../models/getGroupsCount';
import { MultiDirectoryGroupStatsSchema, type MultiDirectoryGroupStats } from '../models/multiDirectoryGroupStats';
import { MultiDirectoryGroupPageSchema, type MultiDirectoryGroupPage } from '../models/multiDirectoryGroupPage';
import type { SearchDirectoryGroups } from '../parameters/searchDirectoryGroups';
import type { GetGroupRoleAssignments } from '../parameters/getGroupRoleAssignments';
import type { GrantGroupAccess } from '../parameters/grantGroupAccess';
import type { RevokeGroupAccess } from '../parameters/revokeGroupAccess';
import type { AddUserToGroup } from '../parameters/addUserToGroup';
import type { RemoveUserFromGroup } from '../parameters/removeUserFromGroup';
import type { GetGroup } from '../parameters/getGroup';
import type { DeleteGroup } from '../parameters/deleteGroup';
import type { GetGroupsCount as GetGroupsCountParameters } from '../parameters/getGroupsCount';
import type { GetGroupsStats } from '../parameters/getGroupsStats';
import type { GetGroups } from '../parameters/getGroups';
import type { CreateGroup } from '../parameters/createGroup';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Return a page of groups in an organization that match the supplied parameters.
 *
 * Use `searchTerm` for free-text search across group names. Filter by IDs, role assignments, resources, members, or
 * specific group identifiers using the corresponding request fields. Use the `expand` field to include additional
 * fields such as `counts.resources` and `counts.users` in the response.
 */
export async function searchDirectoryGroups(
  client: Client,
  parameters: SearchDirectoryGroups,
  options?: RequestOptions,
): Promise<MultiDirectoryGroupSearchPage> {
  const config: SendRequestOptions<MultiDirectoryGroupSearchPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/search`,
    method: 'POST',
    body: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sortBy: parameters.sortBy,
      accountIds: parameters.accountIds,
      directoryIds: parameters.directoryIds,
      roleIds: parameters.roleIds,
      resourceOwners: parameters.resourceOwners,
      resourceIds: parameters.resourceIds,
      searchTerm: parameters.searchTerm,
      groupIds: parameters.groupIds,
      groupNames: parameters.groupNames,
      expand: parameters.expand,
    },
    schema: MultiDirectoryGroupSearchPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a page of role assignments for a group that match the supplied parameters.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:groups:admin`
 */
export async function getGroupRoleAssignments(
  client: Client,
  parameters: GetGroupRoleAssignments,
  options?: RequestOptions,
): Promise<MultiDirectoryGroupRoleAssignmentPage> {
  const config: SendRequestOptions<MultiDirectoryGroupRoleAssignmentPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}/role-assignments`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      directoryIds: parameters.directoryIds,
      resourceOwners: parameters.resourceOwners,
      resourceIds: parameters.resourceIds,
      roleIds: parameters.roleIds,
    },
    schema: MultiDirectoryGroupRoleAssignmentPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Assign a role to a group to assign all members the same role. */
export async function grantGroupAccess(
  client: Client,
  parameters: GrantGroupAccess,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}/role-assignments/assign`,
    method: 'POST',
    body: {
      resourceId: parameters.resourceId,
      roleId: parameters.roleId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Revoke a role from a group to remove access to an app from all members. A member can still access the app if they’re
 * in another group that grants access to the same app.
 */
export async function revokeGroupAccess(
  client: Client,
  parameters: RevokeGroupAccess,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}/role-assignments/revoke`,
    method: 'POST',
    body: {
      resourceId: parameters.resourceId,
      roleId: parameters.roleId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Add a user to a group. This gives the user the same app access and permissions as the group. The user must be in the
 * same directory as the group.
 *
 * **Note:** Adding a user to the org-admin group through this API will return an error after the Units rollout. The
 * org-admin group will no longer grant organization admin access after the rollout. To grant organization admin, use
 * the [Assign organization-level role
 * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-v1-orgs-orgid-users-userid-role-assignments-assign-post)
 * instead. This applies to all organizations, not just unit organizations.
 *
 * You can’t add a user to a group synced from an identity provider. Manage this group in your identity provider
 * instead.
 *
 * You can’t add a user to a group if you’ve exceeded your user limit for an app that the group grants access to.
 * Increase your user limit or suspend another user from the app first.
 */
export async function addUserToGroup(
  client: Client,
  parameters: AddUserToGroup,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}/memberships`,
    method: 'POST',
    body: {
      accountId: parameters.accountId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Remove a user from a group. This removes any app access and permissions granted by this group, but the user may still
 * be in other groups that grant the same app access and permissions.
 */
export async function removeUserFromGroup(
  client: Client,
  parameters: RemoveUserFromGroup,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}/memberships/${parameters.accountId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the details of a group. */
export async function getGroup(
  client: Client,
  parameters: GetGroup,
  options?: RequestOptions,
): Promise<MultiDirectoryGroupDetails> {
  const config: SendRequestOptions<MultiDirectoryGroupDetails> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}`,
    method: 'GET',
    schema: MultiDirectoryGroupDetailsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a group from a directory if you don’t need this group anymore. This removes any app access and permissions
 * granted by this group from all members. A member can still access an app if they’re in another group that grants
 * access to the same app.
 */
export async function deleteGroup(client: Client, parameters: DeleteGroup, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/${parameters.groupId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the count of groups in an organization that match the supplied parameters. */
export async function getGroupsCount(
  client: Client,
  parameters: GetGroupsCountParameters,
  options?: RequestOptions,
): Promise<GetGroupsCount> {
  const config: SendRequestOptions<GetGroupsCount> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/count`,
    method: 'GET',
    searchParams: {
      directoryIds: parameters.directoryIds,
      accountIds: parameters.accountIds,
      groupIds: parameters.groupIds,
      resourceOwners: parameters.resourceOwners,
      resourceIds: parameters.resourceIds,
      searchTerm: parameters.searchTerm,
      roleIds: parameters.roleIds,
    },
    schema: GetGroupsCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns group stats for the organization. */
export async function getGroupsStats(
  client: Client,
  parameters: GetGroupsStats,
  options?: RequestOptions,
): Promise<MultiDirectoryGroupStats> {
  const config: SendRequestOptions<MultiDirectoryGroupStats> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups/stats`,
    method: 'GET',
    schema: MultiDirectoryGroupStatsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * **This API is deprecated and will no longer work after June 30, 2027.** Use the [Search for groups in an organization
 * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-groups/#api-v2-orgs-orgid-directories-directoryid-groups-search-post)
 * instead.
 *
 * Returns a page of groups in an organization that match the supplied parameters.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:groups:admin`
 */
export async function getGroups(
  client: Client,
  parameters: GetGroups,
  options?: RequestOptions,
): Promise<MultiDirectoryGroupPage> {
  const config: SendRequestOptions<MultiDirectoryGroupPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      directoryIds: parameters.directoryIds,
      accountIds: parameters.accountIds,
      groupIds: parameters.groupIds,
      resourceOwners: parameters.resourceOwners,
      resourceIds: parameters.resourceIds,
      searchTerm: parameters.searchTerm,
      counts: parameters.counts,
      sortBy: parameters.sortBy,
      roleIds: parameters.roleIds,
    },
    schema: MultiDirectoryGroupPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a group in a directory to manage app access and permissions for multiple users together. */
export async function createGroup(client: Client, parameters: CreateGroup, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/groups`,
    method: 'POST',
    body: {
      name: parameters.name,
      description: parameters.description,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
