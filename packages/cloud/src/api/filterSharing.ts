import { DefaultShareScopeSchema, type DefaultShareScope } from '#/models/defaultShareScope';
import { SharePermissionSchema, type SharePermission } from '#/models/sharePermission';
import { type SetDefaultShareScope } from '#/parameters/setDefaultShareScope';
import { type GetSharePermissions } from '#/parameters/getSharePermissions';
import { type AddSharePermission } from '#/parameters/addSharePermission';
import { type GetSharePermission } from '#/parameters/getSharePermission';
import { type DeleteSharePermission } from '#/parameters/deleteSharePermission';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns the default sharing settings for new filters and dashboards for a user.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getDefaultShareScope(client: Client): Promise<DefaultShareScope> {
  const config: SendRequestOptions<DefaultShareScope> = {
    url: '/rest/api/3/filter/defaultShareScope',
    method: 'GET',
    schema: DefaultShareScopeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default sharing for new filters and dashboards for a user.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function setDefaultShareScope(
  client: Client,
  parameters: SetDefaultShareScope,
): Promise<DefaultShareScope> {
  const config: SendRequestOptions<DefaultShareScope> = {
    url: '/rest/api/3/filter/defaultShareScope',
    method: 'PUT',
    body: {
      scope: parameters.scope,
    },
    schema: DefaultShareScopeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the
 * public. Sharing with all logged-in users or the public is known as a global share permission.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, share permissions are only returned for:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function getSharePermissions(client: Client, parameters: GetSharePermissions): Promise<SharePermission[]> {
  const config: SendRequestOptions<SharePermission[]> = {
    url: `/rest/api/3/filter/${parameters.id}/permission`,
    method: 'GET',
    schema: z.array(SharePermissionSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public)
 * it will overwrite all share permissions for the filter.
 *
 * Be aware that this operation uses different objects for updating share permissions compared to [Update
 * filter](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-rest-api-3-filter-id-put).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Share
 * dashboards and filters_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the
 * filter.
 */
export async function addSharePermission(client: Client, parameters: AddSharePermission): Promise<SharePermission[]> {
  const config: SendRequestOptions<SharePermission[]> = {
    url: `/rest/api/3/filter/${parameters.id}/permission`,
    method: 'POST',
    body: {
      accountId: parameters.accountId,
      groupId: parameters.groupId,
      groupname: parameters.groupname,
      projectId: parameters.projectId,
      projectRoleId: parameters.projectRoleId,
      rights: parameters.rights,
      type: parameters.type,
    },
    schema: z.array(SharePermissionSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the
 * public. Sharing with all logged-in users or the public is known as a global share permission.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, a share permission is only returned for:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function getSharePermission(client: Client, parameters: GetSharePermission): Promise<SharePermission> {
  const config: SendRequestOptions<SharePermission> = {
    url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
    method: 'GET',
    schema: SharePermissionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a share permission from a filter.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira and the user must own the filter.
 */
export async function deleteSharePermission(client: Client, parameters: DeleteSharePermission): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
