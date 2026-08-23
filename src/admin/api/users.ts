import {
  MultiDirectoryUserSearchPageSchema,
  type MultiDirectoryUserSearchPage,
} from '../models/multiDirectoryUserSearchPage';
import { MultiDirectoryUserDetailsSchema, type MultiDirectoryUserDetails } from '../models/multiDirectoryUserDetails';
import { UserPageSchema, type UserPage } from '../models/userPage';
import {
  MultidirectoryInviteSuccessResponseSchema,
  type MultidirectoryInviteSuccessResponse,
} from '../models/multidirectoryInviteSuccessResponse';
import {
  MultiDirectoryUserRoleAssignmentPageSchema,
  type MultiDirectoryUserRoleAssignmentPage,
} from '../models/multiDirectoryUserRoleAssignmentPage';
import { GetDirectoryUsersCountSchema, type GetDirectoryUsersCount } from '../models/getDirectoryUsersCount';
import { MultiDirectoryUserStatsSchema, type MultiDirectoryUserStats } from '../models/multiDirectoryUserStats';
import {
  UserProductAccessActivityPageSchema,
  type UserProductAccessActivityPage,
} from '../models/userProductAccessActivityPage';
import { MultiDirectoryUserPageSchema, type MultiDirectoryUserPage } from '../models/multiDirectoryUserPage';
import type { SearchDirectoryUsers } from '../parameters/searchDirectoryUsers';
import type { GetDirectoryUserDetails } from '../parameters/getDirectoryUserDetails';
import type { GetUsers } from '../parameters/getUsers';
import type { InviteUsers } from '../parameters/inviteUsers';
import type { GetUserRoleAssignments } from '../parameters/getUserRoleAssignments';
import type { GrantUserAccess } from '../parameters/grantUserAccess';
import type { RevokeUserAccess } from '../parameters/revokeUserAccess';
import type { SuspendDirectoryUser } from '../parameters/suspendDirectoryUser';
import type { RestoreDirectoryUser } from '../parameters/restoreDirectoryUser';
import type { RemoveDirectoryUser } from '../parameters/removeDirectoryUser';
import type { AssignOrganizationRole } from '../parameters/assignOrganizationRole';
import type { RevokeOrganizationRole } from '../parameters/revokeOrganizationRole';
import type { GetDirectoryUsersCount as GetDirectoryUsersCountParameters } from '../parameters/getDirectoryUsersCount';
import type { GetUserStats } from '../parameters/getUserStats';
import type { GetUserLastActiveDates } from '../parameters/getUserLastActiveDates';
import type { GetDirectoryUsers } from '../parameters/getDirectoryUsers';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Return a page of users in an organization that match the supplied parameters.
 *
 * Use `searchTerm` for free-text search across user display names and email addresses. Use `emails` for exact-match
 * filtering by full email addresses. `searchTerm` and `emails` are mutually exclusive. Providing both in the same
 * request returns `400 Bad Request`. Use the `expand` field to include additional fields such as `platformRoles`,
 * `counts.resources`, `productAccess`, and `groups` in the response.
 */
export async function searchDirectoryUsers(
  client: Client,
  parameters: SearchDirectoryUsers,
  options?: RequestOptions,
): Promise<MultiDirectoryUserSearchPage> {
  const config: SendRequestOptions<MultiDirectoryUserSearchPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/search`,
    method: 'POST',
    body: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      accountIds: parameters.accountIds,
      directoryIds: parameters.directoryIds,
      resourceIds: parameters.resourceIds,
      groupIds: parameters.groupIds,
      mfaEnabled: parameters.mfaEnabled,
      claimStatus: parameters.claimStatus,
      status: parameters.status,
      accountStatus: parameters.accountStatus,
      membershipStatus: parameters.membershipStatus,
      roleIds: parameters.roleIds,
      emailDomains: parameters.emailDomains,
      searchTerm: parameters.searchTerm,
      emails: parameters.emails,
      expand: parameters.expand,
      sortBy: parameters.sortBy,
    },
    schema: MultiDirectoryUserSearchPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns detailed information about a specific user in a directory within an organization. */
export async function getDirectoryUserDetails(
  client: Client,
  parameters: GetDirectoryUserDetails,
  options?: RequestOptions,
): Promise<MultiDirectoryUserDetails> {
  const config: SendRequestOptions<MultiDirectoryUserDetails> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/${parameters.userId}`,
    method: 'GET',
    schema: MultiDirectoryUserDetailsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of managed accounts in an organization.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:accounts:admin`
 */
export async function getUsers(client: Client, parameters: GetUsers, options?: RequestOptions): Promise<UserPage> {
  const config: SendRequestOptions<UserPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
    },
    schema: UserPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Invite people to your organization. When you invite someone:
 *
 * - They’re given app roles according to your invitation.
 * - They’re added to directories based on apps in your invitation.
 * - They’re added to groups according to your invitation.
 * - They receive an email invitation if the `sendNotification` field is set to `true` and the `notificationText` field
 *   contains a message to include in the email invitation.
 *
 * **This API is only available to customers who have at least one paid subscription in their organization.**
 */
export async function inviteUsers(
  client: Client,
  parameters: InviteUsers,
  options?: RequestOptions,
): Promise<MultidirectoryInviteSuccessResponse> {
  const config: SendRequestOptions<MultidirectoryInviteSuccessResponse> = {
    url: `/admin/v2/orgs/${parameters.orgId}/users/invite`,
    method: 'POST',
    body: {
      emails: parameters.emails,
      permissionRules: parameters.permissionRules,
      additionalGroups: parameters.additionalGroups,
      sendNotification: parameters.sendNotification,
      notificationText: parameters.notificationText,
    },
    schema: MultidirectoryInviteSuccessResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a page of role assignments for a user that match the supplied parameters.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:directories:admin`
 */
export async function getUserRoleAssignments(
  client: Client,
  parameters: GetUserRoleAssignments,
  options?: RequestOptions,
): Promise<MultiDirectoryUserRoleAssignmentPage> {
  const config: SendRequestOptions<MultiDirectoryUserRoleAssignmentPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/${parameters.accountId}/role-assignments`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      directoryIds: parameters.directoryIds,
      resourceOwners: parameters.resourceOwners,
      resourceIds: parameters.resourceIds,
      roleIds: parameters.roleIds,
    },
    schema: MultiDirectoryUserRoleAssignmentPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** This API can be used to grant Platform Roles to a user. */
export async function grantUserAccess(
  client: Client,
  parameters: GrantUserAccess,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/users/${parameters.userId}/roles/assign`,
    method: 'POST',
    body: {
      role: parameters.role,
      resource: parameters.resource,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** This API can be used to revoke Platform Roles from a user. */
export async function revokeUserAccess(
  client: Client,
  parameters: RevokeUserAccess,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/users/${parameters.userId}/roles/revoke`,
    method: 'POST',
    body: {
      role: parameters.role,
      resource: parameters.resource,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Suspend a user’s access in a directory to remove their access to apps temporarily. You’re not billed for a user when
 * their access is suspended. They regain their roles and group memberships when you restore their access.
 */
export async function suspendDirectoryUser(
  client: Client,
  parameters: SuspendDirectoryUser,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/${parameters.accountId}/suspend`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Restore a user’s access in a directory to let them access apps again. They regain their roles and group memberships
 * from before their access was suspended. We resume billing you for this user.
 */
export async function restoreDirectoryUser(
  client: Client,
  parameters: RestoreDirectoryUser,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/${parameters.accountId}/restore`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Remove a user from a directory if you don’t want them to appear in your directory or have access to your apps
 * anymore. You’re not billed for a user once they’re removed. You must invite the user to your organization again if
 * you want to reinstate their access to your apps. You’ll need to assign their roles and group memberships again.
 */
export async function removeDirectoryUser(
  client: Client,
  parameters: RemoveDirectoryUser,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/${parameters.accountId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Assign an organization-level role to a user. These are roles that have organization-wide privileges, like
 * organization admin.
 *
 * This operation follows eventual consistency. Changes may take up to 30 seconds to be reflected after the operation is
 * performed.
 */
export async function assignOrganizationRole(
  client: Client,
  parameters: AssignOrganizationRole,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/users/${parameters.userId}/role-assignments/assign`,
    method: 'POST',
    body: {
      role: parameters.role,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Remove an organization-level role from a user. These are roles that have organization-wide privileges, like
 * organization admin.
 *
 * This operation follows eventual consistency. Changes may take up to 30 seconds to be reflected after the operation is
 * performed.
 */
export async function revokeOrganizationRole(
  client: Client,
  parameters: RevokeOrganizationRole,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/users/${parameters.userId}/role-assignments/revoke`,
    method: 'POST',
    body: {
      role: parameters.role,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a count of users in an organization that match the supplied parameters. By default, users in all your
 * directories and all your managed accounts are counted (including managed accounts that aren’t in a directory).
 *
 * To count users in a directory only, use the `directoryIds` field. To count your managed accounts, regardless if
 * they’re in a directory or not, use the `claimStatus` field.
 */
export async function getDirectoryUsersCount(
  client: Client,
  parameters: GetDirectoryUsersCountParameters,
  options?: RequestOptions,
): Promise<GetDirectoryUsersCount> {
  const config: SendRequestOptions<GetDirectoryUsersCount> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/count`,
    method: 'GET',
    searchParams: {
      accountIds: parameters.accountIds,
      directoryIds: parameters.directoryIds,
      resourceIds: parameters.resourceIds,
      groupIds: parameters.groupIds,
      mfaEnabled: parameters.mfaEnabled,
      claimStatus: parameters.claimStatus,
      status: parameters.status,
      accountStatus: parameters.accountStatus,
      membershipStatus: parameters.membershipStatus,
      roleIds: parameters.roleIds,
      searchTerm: parameters.searchTerm,
      emailDomains: parameters.emailDomains,
    },
    schema: GetDirectoryUsersCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Return user stats for the organization.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:directories:admin`
 */
export async function getUserStats(
  client: Client,
  parameters: GetUserStats,
  options?: RequestOptions,
): Promise<MultiDirectoryUserStats> {
  const config: SendRequestOptions<MultiDirectoryUserStats> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users/stats`,
    method: 'GET',
    schema: MultiDirectoryUserStatsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * **Additional response parameters of the API (for e.g., `added_to_org`) are available only to customers using the new
 * user management experience.** Learn more about the [new user management
 * experience](https://community.atlassian.com/t5/Atlassian-Access-articles/User-management-for-cloud-admins-just-got-easier/ba-p/1576592).
 *
 * Specifications:
 *
 * - Return a user’s last active date for each product listed in Atlassian Administration.
 * - Active is defined as viewing a product's page for a minimum of 2 seconds.
 * - The data for the last activity may be delayed by up to 24 hours.
 * - If the user has not accessed a product, the `product_access` response field will be empty.
 *
 * Learn the fastest way to call the API with a detailed
 * [tutorial](https://developer.atlassian.com/cloud/admin/organization/user-last-active-dates/).
 */
export async function getUserLastActiveDates(
  client: Client,
  parameters: GetUserLastActiveDates,
  options?: RequestOptions,
): Promise<UserProductAccessActivityPage> {
  const config: SendRequestOptions<UserProductAccessActivityPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/directory/users/${parameters.accountId}/last-active-dates`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
    },
    schema: UserProductAccessActivityPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * **This API is deprecated and will no longer work after June 30, 2027.** Use the [Search for users in an organization
 * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-v2-orgs-orgid-directories-directoryid-users-search-post)
 * instead.
 *
 * Return a page of users in your organization that match the supplied parameters. By default, returns users in all your
 * directories.
 *
 * To get users in a directory only, use the `directoryIds` field. To get your managed accounts, regardless if they’re
 * in a directory or not, use the `claimStatus` field.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:directories:admin`
 */
export async function getDirectoryUsers(
  client: Client,
  parameters: GetDirectoryUsers,
  options?: RequestOptions,
): Promise<MultiDirectoryUserPage> {
  const config: SendRequestOptions<MultiDirectoryUserPage> = {
    url: `/admin/v2/orgs/${parameters.orgId}/directories/${parameters.directoryId}/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      accountIds: parameters.accountIds,
      directoryIds: parameters.directoryIds,
      resourceIds: parameters.resourceIds,
      groupIds: parameters.groupIds,
      mfaEnabled: parameters.mfaEnabled,
      claimStatus: parameters.claimStatus,
      status: parameters.status,
      accountStatus: parameters.accountStatus,
      membershipStatus: parameters.membershipStatus,
      roleIds: parameters.roleIds,
      emailDomains: parameters.emailDomains,
      searchTerm: parameters.searchTerm,
      sortBy: parameters.sortBy,
    },
    schema: MultiDirectoryUserPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
