import type { Client } from '../client';
import type { Request } from '../request';
import type { SetDefaultShareScopeParameters } from './parameters/setDefaultShareScopeParameters';
import type { GetSharePermissionsParameters } from './parameters/getSharePermissionsParameters';
import type { AddSharePermissionParameters } from './parameters/addSharePermissionParameters';
import type { DeleteSharePermissionParameters } from './parameters/deleteSharePermissionParameters';
import type { GetSharePermissionParameters } from './parameters/getSharePermissionParameters';

export class FilterSharing {
  constructor(private client: Client) {}
  /**
   * Returns the default sharing settings for new filters and dashboards for a user. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getDefaultShareScope() {
    const request: Request = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the default sharing for new filters and dashboards for a user. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async setDefaultShareScope(parameters: SetDefaultShareScopeParameters) {
    const request: Request = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'PUT',
      body: {
        scope: parameters.scope,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or
   * the public. Sharing with all logged-in users or the public is known as a global share permission. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, share permissions are only returned for:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async getSharePermissions(parameters: GetSharePermissionsParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/permission`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the
   * public) it will overwrite all share permissions for the filter. *
   *
   * - Be aware that this operation uses different objects for updating share permissions compared to [Update
   *   filter](#api-rest-api-2-filter-id-put).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Share
   *   dashboards and filters_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the
   *   filter.
   */
  async addSharePermission(parameters: AddSharePermissionParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/permission`,
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
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a share permission from a filter. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira and the user must own the filter.
   */
  async deleteSharePermission(parameters: DeleteSharePermissionParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the
   * public. Sharing with all logged-in users or the public is known as a global share permission. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, a share permission is only returned for:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async getSharePermission(parameters: GetSharePermissionParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
