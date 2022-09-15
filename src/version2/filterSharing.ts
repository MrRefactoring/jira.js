import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class FilterSharing {
  constructor(private client: Client) {}

  /**
   * Returns the default sharing settings for new filters and dashboards for a user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the default sharing settings for new filters and dashboards for a user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: never): Promise<T>;
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the default sharing for new filters and dashboards for a user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async setDefaultShareScope<T = Models.DefaultShareScope>(
    parameters: Parameters.SetDefaultShareScope | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the default sharing for new filters and dashboards for a user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async setDefaultShareScope<T = Models.DefaultShareScope>(
    parameters: Parameters.SetDefaultShareScope | string,
    callback?: never
  ): Promise<T>;
  async setDefaultShareScope<T = Models.DefaultShareScope>(
    parameters: Parameters.SetDefaultShareScope | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const scope = typeof parameters === 'string' ? parameters : parameters.scope;

    const config: RequestConfig = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'PUT',
      data: {
        scope,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or
   * the public. Sharing with all logged-in users or the public is known as a global share permission.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, share permissions are only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has _Browse projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getSharePermissions<T = Models.SharePermission[]>(
    parameters: Parameters.GetSharePermissions | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or
   * the public. Sharing with all logged-in users or the public is known as a global share permission.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, share permissions are only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has _Browse projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getSharePermissions<T = Models.SharePermission[]>(
    parameters: Parameters.GetSharePermissions | string,
    callback?: never
  ): Promise<T>;
  async getSharePermissions<T = Models.SharePermission[]>(
    parameters: Parameters.GetSharePermissions | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/filter/${id}/permission`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the
   * public) it will overwrite all share permissions for the filter.
   *
   * Be aware that this operation uses different objects for updating share permissions compared to [Update
   * filter](#api-rest-api-2-filter-id-put).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Share
   * dashboards and filters_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the
   * filter.
   */
  async addSharePermission<T = Models.SharePermission[]>(
    parameters: Parameters.AddSharePermission,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the
   * public) it will overwrite all share permissions for the filter.
   *
   * Be aware that this operation uses different objects for updating share permissions compared to [Update
   * filter](#api-rest-api-2-filter-id-put).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Share
   * dashboards and filters_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the
   * filter.
   */
  async addSharePermission<T = Models.SharePermission[]>(
    parameters: Parameters.AddSharePermission,
    callback?: never
  ): Promise<T>;
  async addSharePermission<T = Models.SharePermission[]>(
    parameters: Parameters.AddSharePermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/permission`,
      method: 'POST',
      data: {
        type: parameters.type,
        projectId: parameters.projectId,
        groupname: parameters.groupname,
        projectRoleId: parameters.projectRoleId,
        accountId: parameters.accountId,
        rights: parameters.rights,
        groupId: parameters.groupId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the
   * public. Sharing with all logged-in users or the public is known as a global share permission.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, a share permission is only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has _Browse projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getSharePermission<T = Models.SharePermission>(
    parameters: Parameters.GetSharePermission,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the
   * public. Sharing with all logged-in users or the public is known as a global share permission.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, a share permission is only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has _Browse projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getSharePermission<T = Models.SharePermission>(
    parameters: Parameters.GetSharePermission,
    callback?: never
  ): Promise<T>;
  async getSharePermission<T = Models.SharePermission>(
    parameters: Parameters.GetSharePermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a share permission from a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira and the user must own the filter.
   */
  async deleteSharePermission<T = void>(
    parameters: Parameters.DeleteSharePermission,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a share permission from a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira and the user must own the filter.
   */
  async deleteSharePermission<T = void>(parameters: Parameters.DeleteSharePermission, callback?: never): Promise<T>;
  async deleteSharePermission<T = void>(
    parameters: Parameters.DeleteSharePermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
