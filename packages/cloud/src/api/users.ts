import { DashboardUserSchema, type DashboardUser } from '#/models/dashboardUser';
import { ColumnItemSchema, type ColumnItem } from '#/models/columnItem';
import { UnrestrictedUserEmailSchema, type UnrestrictedUserEmail } from '#/models/unrestrictedUserEmail';
import { GroupNameSchema, type GroupName } from '#/models/groupName';
import { type GetUser } from '#/parameters/getUser';
import { type CreateUser } from '#/parameters/createUser';
import { type RemoveUser } from '#/parameters/removeUser';
import { type GetUserDefaultColumns } from '#/parameters/getUserDefaultColumns';
import { type SetUserColumns } from '#/parameters/setUserColumns';
import { type ResetUserColumns } from '#/parameters/resetUserColumns';
import { type GetUserEmail } from '#/parameters/getUserEmail';
import { type GetUserEmailBulk } from '#/parameters/getUserEmailBulk';
import { type GetUserGroups } from '#/parameters/getUserGroups';
import { type GetAllUsersDefault } from '#/parameters/getAllUsersDefault';
import { type GetAllUsers } from '#/parameters/getAllUsers';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a user.
 *
 * Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that the
 * user's email address is hidden. See the [Profile visibility
 * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getUser(client: Client, parameters?: GetUser): Promise<DashboardUser> {
  const config: SendRequestOptions<DashboardUser> = {
    url: '/rest/api/3/user',
    method: 'GET',
    searchParams: {
      accountId: parameters?.accountId,
      expand: parameters?.expand,
    },
    schema: DashboardUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is
 * available this resource will be deprecated.
 *
 * **Note:** This API does not support Forge apps.
 *
 * If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have
 * access to Jira, the operation returns a 400 status.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). The caller has to be an
 * **organization admin**.
 */
export async function createUser(client: Client, parameters: CreateUser): Promise<DashboardUser> {
  const config: SendRequestOptions<DashboardUser> = {
    url: '/rest/api/3/user',
    method: 'POST',
    body: {
      emailAddress: parameters.emailAddress,
      products: parameters.products,
      self: parameters.self,
    },
    schema: DashboardUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This
 * operation does not delete the user's Atlassian account.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Site
 * administration (that is, membership of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function removeUser(client: Client, parameters: RemoveUser): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/user',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If `accountId` is
 * not passed in the request, the calling user's details are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLgl), to get the column details for any
 *   user.
 * - Permission to access Jira, to get the calling user's column details.
 */
export async function getUserDefaultColumns(client: Client, parameters?: GetUserDefaultColumns): Promise<ColumnItem[]> {
  const config: SendRequestOptions<ColumnItem[]> = {
    url: '/rest/api/3/user/columns',
    method: 'GET',
    searchParams: {
      accountId: parameters?.accountId,
    },
    schema: z.array(ColumnItemSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID is
 * not passed, the calling user's default columns are set. If no column details are sent, then all default columns are
 * removed.
 *
 * The parameters for this resource are expressed as HTML form data. For example, in curl:
 *
 * `curl -X PUT -d columns=summary -d columns=description
 * https://your-domain.atlassian.net/rest/api/3/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5'`
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
 * - Permission to access Jira, to set the calling user's columns.
 */
export async function setUserColumns(client: Client, parameters: SetUserColumns): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/user/columns',
    method: 'PUT',
    searchParams: {
      accountId: parameters.accountId,
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system
 * default. If `accountId` is not passed, the calling user's default columns are reset.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.
 * - Permission to access Jira, to set the calling user's columns.
 */
export async function resetUserColumns(client: Client, parameters: ResetUserColumns): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/user/columns',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
 * only available to apps approved by Atlassian, according to these
 * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
 * For Forge apps, this API only supports access via asApp() requests.
 */
export async function getUserEmail(client: Client, parameters: GetUserEmail): Promise<UnrestrictedUserEmail> {
  const config: SendRequestOptions<UnrestrictedUserEmail> = {
    url: '/rest/api/3/user/email',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: UnrestrictedUserEmailSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is
 * only available to apps approved by Atlassian, according to these
 * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
 * For Forge apps, this API only supports access via asApp() requests.
 */
export async function getUserEmailBulk(client: Client, parameters: GetUserEmailBulk): Promise<UnrestrictedUserEmail> {
  const config: SendRequestOptions<UnrestrictedUserEmail> = {
    url: '/rest/api/3/user/email/bulk',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: UnrestrictedUserEmailSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the groups to which a user belongs.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getUserGroups(client: Client, parameters: GetUserGroups): Promise<GroupName[]> {
  const config: SendRequestOptions<GroupName[]> = {
    url: '/rest/api/3/user/groups',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: z.array(GroupNameSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of all users, including active users, inactive users and previously deleted users that have an
 * Atlassian account.
 *
 * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the
 * user's email address is hidden. See the [Profile visibility
 * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllUsersDefault(client: Client, parameters?: GetAllUsersDefault): Promise<DashboardUser[]> {
  const config: SendRequestOptions<DashboardUser[]> = {
    url: '/rest/api/3/users',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      expand: parameters?.expand,
    },
    schema: z.array(DashboardUserSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of all users, including active users, inactive users and previously deleted users that have an
 * Atlassian account.
 *
 * Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the
 * user's email address is hidden. See the [Profile visibility
 * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * users and groups_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllUsers(client: Client, parameters?: GetAllUsers): Promise<DashboardUser[]> {
  const config: SendRequestOptions<DashboardUser[]> = {
    url: '/rest/api/3/users/search',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      expand: parameters?.expand,
    },
    schema: z.array(DashboardUserSchema),
  };

  return await client.sendRequest(config);
}
