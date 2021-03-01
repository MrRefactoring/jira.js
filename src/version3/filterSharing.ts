import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class FilterSharing {
  constructor(private client: Client) { }
  /**
     * Returns the default sharing settings for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns the default sharing settings for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: undefined): Promise<T>;
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/filter/defaultShareScope',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getDefaultShareScope' });
  }
  /**
     * Sets the default sharing for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async setDefaultShareScope<T = Models.DefaultShareScope>(parameters?: Parameters.SetDefaultShareScope, callback?: Callback<T>): Promise<void>;
  /**
     * Sets the default sharing for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async setDefaultShareScope<T = Models.DefaultShareScope>(parameters?: Parameters.SetDefaultShareScope, callback?: undefined): Promise<T>;
  async setDefaultShareScope<T = Models.DefaultShareScope>(parameters?: Parameters.SetDefaultShareScope, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/filter/defaultShareScope',
      method: 'PUT',
      data: {
        scope: parameters?.scope,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'setDefaultShareScope' });
  }
  /**
     * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, share permissions are only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public. */
  async getSharePermissions<T = unknown>(parameters: Parameters.GetSharePermissions, callback: Callback<T>): Promise<void>;
  /**
     * Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, share permissions are only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public. */
  async getSharePermissions<T = unknown>(parameters: Parameters.GetSharePermissions, callback?: undefined): Promise<T>;
  async getSharePermissions<T = unknown>(parameters: Parameters.GetSharePermissions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/permission`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getSharePermissions' });
  }
  /**
     * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.
     *
     * Be aware that this operation uses different objects for updating share permissions compared to [Update filter](#api-rest-api-3-filter-id-put).
     *
     * **[Permissions](#permissions) required:** *Share dashboards and filters* [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the filter. */
  async addSharePermission<T = unknown>(parameters: Parameters.AddSharePermission, callback: Callback<T>): Promise<void>;
  /**
     * Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.
     *
     * Be aware that this operation uses different objects for updating share permissions compared to [Update filter](#api-rest-api-3-filter-id-put).
     *
     * **[Permissions](#permissions) required:** *Share dashboards and filters* [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the filter. */
  async addSharePermission<T = unknown>(parameters: Parameters.AddSharePermission, callback?: undefined): Promise<T>;
  async addSharePermission<T = unknown>(parameters: Parameters.AddSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/permission`,
      method: 'POST',
      data: {
        type: parameters.type,
        projectId: parameters.projectId,
        groupname: parameters.groupname,
        projectRoleId: parameters.projectRoleId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'addSharePermission' });
  }
  /**
     * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, a share permission is only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public. */
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback: Callback<T>): Promise<void>;
  /**
     * Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, a share permission is only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public. */
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback?: undefined): Promise<T>;
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getSharePermission' });
  }
  /**
     * Deletes a share permission from a filter.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira and the user must own the filter. */
  async deleteSharePermission<T = void>(parameters: Parameters.DeleteSharePermission, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a share permission from a filter.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira and the user must own the filter. */
  async deleteSharePermission<T = void>(parameters: Parameters.DeleteSharePermission, callback?: undefined): Promise<T>;
  async deleteSharePermission<T = void>(parameters: Parameters.DeleteSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteSharePermission' });
  }
}
